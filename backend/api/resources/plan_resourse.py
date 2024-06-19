# create plan
# get all plans
# push to calendar
import json
from flask_restful import Resource, reqparse
from ..models import StudyPlan, StudyPlanDay, StudyPlanWeek
from api import db
from ..study_plan import get_studyplan
from ..utils import push_calendar_events, get_study_events


# Resource for creating a chat
class CreatePlan(Resource):
    def post(self):
        parser = reqparse.RequestParser()
        parser.add_argument('topic',      type=str, required=True, help="topic is required")
        parser.add_argument('week_count', type=int, required=True, help="week_count is required")
        parser.add_argument('free_days',  type=str, action='append', required=True, help="free_days is required")
        args = parser.parse_args()
        print(args['free_days'])
        gpt_response = get_studyplan(subject=args['topic'],
                                     week_count=args['week_count'],
                                     free_days=args['free_days'])

        with open('gpt_response.json', mode='w', encoding='utf-8') as f:
            json.dump(gpt_response, f, indent=4)

        plan_obj = StudyPlan(title=args['topic'])
        db.session.add(plan_obj)
        db.session.flush()

        # now create week list
        week_objs = [StudyPlanWeek(plan_id=plan_obj.id) for w in gpt_response['week_list']]
        db.session.add_all(week_objs)
        db.session.flush()

        days_objs = []

        for w_obj, week in zip(week_objs, gpt_response['week_list']):
            for day in week['day_list']:
                day_obj = StudyPlanDay(week_id=w_obj.id, day_name=day['day_name'], study_hours=day['study_hours'],
                                       topics_to_cover=json.dumps(day['topics_to_cover']))
                days_objs.append(day_obj)

        db.session.add_all(days_objs)
        db.session.commit()

        return plan_obj.to_dict(), 201






class GetPlan(Resource):
    def get(self, plan_id):
        plan_obj = StudyPlan.query.get_or_404(plan_id)

        return plan_obj.to_dict()


class GetAllPlans(Resource):
    def get(self):
        plan_objs = StudyPlan.query.all()

        return [c.to_dict() for c in plan_objs]


class PushEvents(Resource):
    def post(self, plan_id):
        plan_obj = StudyPlan.query.get_or_404(plan_id)
        plan_data = plan_obj.to_dict()
        with open('db_plan.json', mode='w', encoding='utf-8') as f:
            json.dump(plan_data, f, indent=4)
        events = get_study_events(plan_data)
        push_calendar_events(events)
        return {'message': 'pushed events successfully'}, 200


