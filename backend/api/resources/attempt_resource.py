from flask_restful import Resource, reqparse
from ..models import QuizModel, ProblemModel, ReportModel, ChoiceModel
from api import db
from ..report import get_report
from ..models import AttemptModel
import json

# Resource for Generating the Report
class CreateReport(Resource):
    def post(self):

        # Create a request parser
        parser = reqparse.RequestParser()

        # Add arguments to the parser
        parser.add_argument('quiz_id', type=int,  required=True, help="Quiz ID is required")
        parser.add_argument('choices', type=dict, required=True, action='append', help="Choices are required")
        args = parser.parse_args()

        quiz_id = args['quiz_id']
        choices = args['choices']

        score = 0

        my_attempt = []
        incorrect_problems = []

        # Iterate over each choice
        for c in choices:
            problem_id   = c['problem_id']
            choice_value = c['choice']
            problem_obj  = ProblemModel.query.filter_by(id=problem_id).first()

            correct_answer = problem_obj.correct_answer
            if choice_value == correct_answer:
                score += 1
            else:
                incorrect_problems.append(
                    {"question": problem_obj.question,
                     'correct_answer': problem_obj.correct_answer,
                     'your_answer': choice_value,
                     'correct_answer_explanation': problem_obj.correct_answer_explanation,
                     }
                )

            item = {
                'question': problem_obj.question,
                'correct_answer': problem_obj.correct_answer,
                'my_answer': choice_value
            }

            my_attempt.append(item)

        quiz_title = QuizModel.query.filter_by(id=quiz_id).first().title
        report_content = f'Title: {quiz_title}'
        for item in my_attempt:
            report_content += (f"Question: {item['question']}\n"
                               f"Correct Answer: {item['correct_answer']}\n"
                               f"My Answer: {item['my_answer']}\n\n")


        attempt_obj = AttemptModel(quiz_id=quiz_id, score=score)
        db.session.add(attempt_obj)
        db.session.flush()

        report = get_report(report_content)

        report_obj = ReportModel(attempt_id=attempt_obj.id,
                                 remarks=report['remarks'],
                                 concepts_you_understand=json.dumps(report['concepts_you_understand']),
                                 concepts_you_dont_understand=json.dumps(report['concepts_you_dont_understand']),
                                 motivational_quote=report['motivational_quote']
                                 )


        choice_objs = []
        for choice in choices:
            choice_obj = ChoiceModel(attempt_id=attempt_obj.id,
                                     problem_id=choice['problem_id'],
                                     value=choice['choice'])

            choice_objs.append(choice_obj)

        db.session.add_all(choice_objs)
        db.session.add(report_obj)
        db.session.commit()


        response_json = {
            "score": score,
            "total_score": len(choices),
            "incorrect_problems": incorrect_problems,
            "report": report_obj.to_dict()
        }
        return response_json, 200



