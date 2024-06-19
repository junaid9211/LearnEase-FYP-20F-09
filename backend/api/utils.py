from datetime import datetime, timedelta
import pytz
from google.auth.transport.requests import Request
from google.oauth2.credentials import Credentials
from google_auth_oauthlib.flow import InstalledAppFlow
from googleapiclient.discovery import build
from googleapiclient.errors import HttpError
import os

def get_current_time_iso():
    # Get the current UTC timestamp
    current_time = datetime.utcnow()

    # Add 5 hours to the current time
    new_time = current_time + timedelta(hours=5)

    # Convert the new time to ISO 8601 format
    new_time_iso = new_time.isoformat()
    return new_time_iso


def get_start_of_next_week() -> datetime:
    current_date = datetime.today().replace(hour=12, minute=0, second=0, microsecond=0)
    weekday_today = current_date.weekday()
    days_until_next_monday = (7 - weekday_today) % 7
    start_of_next_week = current_date + timedelta(days=days_until_next_monday)
    pakistan_tz = pytz.timezone('Asia/Karachi')
    start_time = pakistan_tz.localize(start_of_next_week)
    return start_time


def get_study_events(gpt_response):
    events = []
    for week_index, week in enumerate(gpt_response['week_list']):
        start_time = get_start_of_next_week() + timedelta(weeks=week_index)
        day_offset = 0
        for day in week['day_list']:
            summary = "Study: "
            description = "Today Study These topics: \n\n"

            for t in day['topics_to_cover']:
                summary += t['topic_name'] + ", "
                description += t['topic_name'] + "\n"
                description += t['description'] + "\n\n"

            if day['day_name'].strip().lower() == 'monday':
                day_offset = 0
            elif day['day_name'].strip().lower() == 'tuesday':
                day_offset = 1
            elif day['day_name'].strip().lower() == 'wednesday':
                day_offset = 2
            elif day['day_name'].strip().lower() == 'thursday':
                day_offset = 3
            elif day['day_name'].strip().lower() == 'friday':
                day_offset = 4
            elif day['day_name'].strip().lower() == 'saturday':
                day_offset = 5
            elif day['day_name'].strip().lower() == 'sunday':
                day_offset = 6

            start_time = start_time + timedelta(days=day_offset)
            e = {
                "summary": summary,
                "location": "No location",
                "description": description,
                "colorId": 2,
                "start": {
                    "dateTime": start_time.strftime('%Y-%m-%dT%H:%M:%S%z'),
                    "timeZone": "Asia/Karachi"
                },
                "end": {
                    "dateTime": (start_time + timedelta(hours=day['study_hours'])).strftime('%Y-%m-%dT%H:%M:%S%z'),
                    "timeZone": "Asia/Karachi"
                }
            }

            events.append(e)


            start_time = get_start_of_next_week() + timedelta(weeks=week_index)




    return events


def push_calendar_events(events):
    SCOPES = ["https://www.googleapis.com/auth/calendar"]
    token_file = 'token.json'
    creds_file = 'calendar-credentials.json"'
    creds = None
    if os.path.exists(token_file):
        creds = Credentials.from_authorized_user_file(token_file, SCOPES)

    if not creds or not creds.valid:
        if creds and creds.expired and creds.refresh_token:
            creds.refresh(Request())
        else:
            flow = InstalledAppFlow.from_client_secrets_file(creds_file, SCOPES)
            creds = flow.run_local_server(port=0)
        # Save the credentials for the next run
        with open(token_file, "w") as token:
            token.write(creds.to_json())

    try:
        service = build("calendar", "v3", credentials=creds)

        # loop through the list and create events
        for e in events:
            event = service.events().insert(calendarId="primary", body=e).execute()
            print(f"Event created: {event.get('htmlLink')}")

    except HttpError as error:
        print(f"An error occurred: {error}")

