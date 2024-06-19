# now what?
import json, os
from utils import get_study_events, push_calendar_events
with open('plan.json', mode='r', encoding='utf-8') as f:
    r = json.load(f)

events = get_study_events(r)
push_calendar_events(events)