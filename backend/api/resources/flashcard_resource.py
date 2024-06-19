from flask_restful import Resource, reqparse
from ..models import FlashcardSetModel, FlashcardModel
from api import db
from ..flashcards import get_flashcards


# Resource for creating a chat
class CreateFlashcards(Resource):
    def post(self):
        parser = reqparse.RequestParser()
        parser.add_argument('topic', type=str, required=True, help="Title is required")
        parser.add_argument('count', type=int, required=True, help="Category id is required")
        args = parser.parse_args()

        gpt_response = get_flashcards(args['topic'], args['count'])
        flashcards_set_obj = FlashcardSetModel(title=gpt_response['title'], description=gpt_response['description'])

        # create flashcard set and flashcards
        db.session.add(flashcards_set_obj)
        db.session.flush()

        for f in gpt_response['flashcard_list']:
            card_obj = FlashcardModel(flashcard_set_id=flashcards_set_obj.id, front=f['front'], back=f['back'])
            db.session.add(card_obj)

        db.session.commit()

        return flashcards_set_obj.to_dict(), 201



class GetFlashCardSet(Resource):
    def get(self, flashcards_set_id):
        set_obj = FlashcardSetModel.query.get_or_404(flashcards_set_id)

        return set_obj.to_dict()


class GetAllFlashCardSet(Resource):
    def get(self, ):
        set_objs = FlashcardSetModel.query.all()

        return [f.to_dict() for f in set_objs]


