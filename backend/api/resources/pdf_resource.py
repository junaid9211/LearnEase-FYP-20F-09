from flask_restful import Resource, reqparse
from flask import Flask, request
from api import db
import os
from ..process_pdf import load_vectorstore, pdf_cover_to_image, get_message_response, get_vectorstore, get_conversation_chain, get_pdf_text, get_text_chunks
from ..models import BookModel, BookMessageModel
from langchain_community.vectorstores import FAISS


UPLOAD_FOLDER = 'uploads'
COVERS_FOLDER = 'covers'
VECTOR_FOLDER = 'vectors'


class FileUpload(Resource):
    def post(self):
        if 'file' not in request.files:
            return {"message": "No file part"}, 400

        file = request.files['file']
        if file.filename == '':
            return {"message": "No selected file"}, 400

        if os.path.exists(os.path.join(UPLOAD_FOLDER, file.filename)):
            return {"message": "Book is already uploaded"}, 400


        # 1. save the file
        os.makedirs(UPLOAD_FOLDER, exist_ok=True)
        pdf_path = os.path.join(UPLOAD_FOLDER, file.filename)
        file.save(pdf_path)

        # 2. create the cover
        os.makedirs(COVERS_FOLDER, exist_ok=True)
        cover_file_name = f'{file.filename.split(".")[0]} - Cover.png'
        cover_path = os.path.join(COVERS_FOLDER, cover_file_name)
        pdf_cover_to_image(pdf_path, cover_path)


        # 3. create vector store
        raw_text = get_pdf_text(pdf_path)

        # get the text chunks
        text_chunks = get_text_chunks(raw_text)

        # create vector store
        vectorstore = get_vectorstore(text_chunks)

        vectorstore_name = f'{file.filename.split(".")[0]}'
        vectorstore_path = os.path.join(VECTOR_FOLDER, vectorstore_name)
        vectorstore.save_local(vectorstore_path)



        # 4. store it into the database
        book_obj = BookModel(
            pdf_path=pdf_path,
            cover_path=cover_path,
            vectorstore_path=vectorstore_path
        )

        db.session.add(book_obj)
        db.session.commit()

        return {"message": "File uploaded successfully"}, 200



# fetch all books info
class FetchAllBooks(Resource):
    def get(self):
        book_models = BookModel.query.all()
        return [b.to_dict() for b in book_models]


class FetchBook(Resource):
    def get(self, book_id):
        book_obj = BookModel.query.get_or_404(book_id)
        return book_obj.to_dict()




# need to get a response for a particular book
class GetBookResponse(Resource):
    def post(self):
        parser = reqparse.RequestParser()
        parser.add_argument('book_id', type=int, required=True,      help="Chat ID is required")
        parser.add_argument('content', type=str, required=True,      help="Content is required")
        args = parser.parse_args()

        book         = BookModel.query.filter_by(id=args['book_id']).first()
        vectorstore = load_vectorstore(book.vectorstore_path)
        conversation_chain = get_conversation_chain(vectorstore)
        response_obj = get_message_response(conversation_chain, args['content'])
        chat_history = response_obj['chat_history']

        user_msg      = chat_history[0].content
        assistant_msg = chat_history[1].content

        user_message     = BookMessageModel(role='user',       content=user_msg,        book_id=args['book_id'])
        assitant_message = BookMessageModel(role='assistant',  content=assistant_msg,   book_id=args['book_id'])

        db.session.add(user_message)
        db.session.add(assitant_message)
        db.session.commit()

        return {
            'response': assistant_msg
        }

