from flask import request, jsonify
from flask_restful import Resource, reqparse
from ..models import CategoryModel, ChatModel, MessageModel
from api import db
from ..chat import get_chat_reponse


# Resource for creating a chat
class ChatCreate(Resource):
    def post(self):
        parser = reqparse.RequestParser()
        parser.add_argument('title',       type=str, required=True, help="Title is required")
        parser.add_argument('category_id', type=int, required=True, help="Category id is required")
        args = parser.parse_args()

        chat_obj = ChatModel(title=args['title'], category_id=args['category_id'])
        db.session.add(chat_obj)
        db.session.commit()

        return {'message': 'Chat created successfully', 'chat_id': chat_obj.id}, 201



# Resource for deleting a chat
class ChatDelete(Resource):
    def delete(self, chat_id):
        chat = ChatModel.query.get_or_404(chat_id)
        db.session.delete(chat)
        db.session.commit()
        return {'message': 'Chat deleted successfully'}, 200


# Resource for updating a chat title
class ChatUpdate(Resource):
    def put(self, chat_id):
        chat = ChatModel.query.get_or_404(chat_id)
        parser = reqparse.RequestParser()
        parser.add_argument('title',       type=str, help="Title is required")
        parser.add_argument('category_id', type=int, help="Category id of the chat")
        parser.add_argument('favorite',    type=bool, help="Favorite value of the chat")
        args = parser.parse_args()

        # Check if 'title' is provided and update if so
        if args['title'] is not None:
            chat.title = args['title']

        # Check if 'category_id' is provided and update if so
        if args['category_id'] is not None:
            chat.category_id = args['category_id']

        # Check explicitly if 'favorite' is provided and update regardless of its value
        if args['favorite'] is not None:
            chat.favorite = args['favorite']



        db.session.commit()
        print(f'args {args}')
        return chat.to_dict(), 200



class ChatGet(Resource):
    def get(self, chat_id):
        chat_obj = ChatModel.query.get_or_404(chat_id)

        return chat_obj.to_dict()


class GellAllChats(Resource):
    def get(self, ):
        chats_objs = ChatModel.query.all()

        return [c.to_dict() for c in chats_objs]



# Resource for handling messages


class GenerateChatResponse(Resource):
    # Endpoint for creating a message
    def post(self):
        parser = reqparse.RequestParser()
        parser.add_argument('content', type=str, required=True,      help="Content is required")
        parser.add_argument('chat_id', type=int, required=True,      help="Chat ID is required")
        parser.add_argument('tone',    type=str, default='balanced', help="Tone for the message is required")
        args = parser.parse_args()

        chat         = ChatModel.query.filter_by(id=args['chat_id']).first()
        chat_history = [{'role': message.role, 'content': message.content} for message in chat.messages]

        print(f'msg: {args["content"]} {args["tone"]}')
        # create gpt response and send it.....
        user_prompt = args['content']
        assistant_response = get_chat_reponse(user_prompt, chat_history, tone_choice=args['tone'])
        #
        user_message     = MessageModel(role='user',       content=user_prompt,        chat_id=args['chat_id'])
        assitant_message = MessageModel(role='assistant',  content=assistant_response, chat_id=args['chat_id'])
        #
        db.session.add(user_message)
        db.session.add(assitant_message)
        db.session.commit()
        return assitant_message.to_dict(), 201
        # return {'role': 'assistant', 'content': 'this is assistant response'}


class QueryChats(Resource):
    # Endpoint for getting responses
    def get(self):
        pagination_args = reqparse.RequestParser()
        pagination_args.add_argument('query', type=str, required=False, default='', help="Search query", location='args')

        args = pagination_args.parse_args()
        query = args['query'].strip().lower()
        print(f'query: {query}')

        if not query:
            return []

        messages = MessageModel.query.filter(MessageModel.content.ilike(f'%{query}%')).all()


        found_messages = []
        for message in messages:
            category = CategoryModel.query.filter_by(id=message.chat.category_id).first()
            if category:
                item = {
                    'message': {'id': message.id, 'role': message.role, 'content': message.content},
                    'chat': {'id': message.chat.id, 'title': message.chat.title, 'favorite': message.chat.favorite},
                    'category': {'id': category.id, 'name': category.name, 'color': category.color},
                }
                found_messages.append(item)

        print(f'Found Messages: {len(found_messages)}')
        return found_messages, 200



