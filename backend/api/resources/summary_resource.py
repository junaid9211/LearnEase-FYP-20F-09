from flask_restful import Resource, reqparse
from ..models import SummaryModel
from ..youtube_summary import get_youtube_video_title, get_youtube_summary
from api import db
import json



class SummaryGenerate(Resource):

    def post(self):
        # Argument parsing for POST
        summary_post_args = reqparse.RequestParser()
        summary_post_args.add_argument('youtube_link', type=str, help="Link to the YouTube video is required", required=True)
        args = summary_post_args.parse_args()
        youtube_url = args['youtube_link']
        video_title = get_youtube_video_title(youtube_url)
        summary_response = get_youtube_summary(youtube_url)
        summary_obj = SummaryModel(
            video_link=youtube_url,
            video_title=video_title,
            heading=summary_response.title,
            content=summary_response.content,
            points=json.dumps(summary_response.points))
        db.session.add(summary_obj)
        db.session.commit()
        # summary_obj = SummaryModel.query.filter_by(id=1).first()
        print(youtube_url)

        return summary_obj.to_dict()



class SummaryFetch(Resource):
    def get(self, summary_id):
        summary = SummaryModel.query.get_or_404(summary_id)
        return summary.to_dict()



class AllSummaries(Resource):
    def get(self):
        # Argument parsing for GET pagination and search
        pagination_args = reqparse.RequestParser()
        pagination_args.add_argument('query', type=str, required=False, default='', help="Search query", location='args')

        args = pagination_args.parse_args()

        # Query building based on search
        query = args['query'].strip().lower()

        print(f"query-------- {query}")
        base_query = SummaryModel.query
        if query:
            search_terms = f'%{query}%'
            base_query = base_query.filter(
                (SummaryModel.video_title.ilike(search_terms)) |
                (SummaryModel.video_link.ilike(search_terms)) |
                (SummaryModel.content.ilike(search_terms)) |
                (SummaryModel.points.ilike(search_terms)) |
                (SummaryModel.heading.ilike(search_terms))
            )

        # Apply pagination to the filtered query
        summaries_objs = base_query.all()
        summaries = [summary.to_dict() for summary in summaries_objs]

        return summaries

