from flask_restful import Resource, reqparse
from ..models import QuizModel, ChatModel, ProblemModel
from api import db
from ..quiz import get_quiz
import json


# Resource for updating a chat title
class CreateQuiz(Resource):
    def post(self, chat_id):
        chat   = ChatModel.query.get_or_404(chat_id)
        parser = reqparse.RequestParser()
        parser.add_argument('question_count', type=int, default=10, help="Question count")
        args = parser.parse_args()

        # grab all the assistant content of the chat
        assistant_content = ''
        for m in chat.messages:
            if m.role == 'assistant':
                assistant_content += m.content
                assistant_content += '\n'

        quiz = get_quiz(assistant_content, question_count=args['question_count'])

        with open('quiz-flask.json', mode='w', encoding='utf-8') as f:
            json.dump(quiz, f, indent=4)
            # quiz = json.load(f)


        quiz_object = QuizModel(chat_id=chat.id, title=quiz['quiz_title'])
        db.session.add(quiz_object)
        db.session.flush()

        problem_objects = []
        for p in quiz['problem_list']:
            options_str = json.dumps([
                p['correct_answer'],
                p['incorrect_answer1'],
                p['incorrect_answer2'],
                p['incorrect_answer3']]
            )

            problem_obj = ProblemModel(
                quiz_id=quiz_object.id,
                question=p['question'],
                options=options_str,
                correct_answer=p['correct_answer'],
                correct_answer_explanation=p['correct_answer_explanation']
            )

            problem_objects.append(problem_obj)

        db.session.add_all(problem_objects)
        db.session.commit()

        return quiz_object.to_dict(), 200



class FetchQuiz(Resource):
    def get(self, quiz_id):
        quiz_obj = QuizModel.query.get_or_404(quiz_id)
        return quiz_obj.to_dict()



class FetchAllQuizzes(Resource):
    def get(self):
        quizzes_objs = QuizModel.query.all()
        return [c.to_dict() for c in quizzes_objs]
