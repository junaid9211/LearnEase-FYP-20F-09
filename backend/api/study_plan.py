import json
from typing import List

from langchain.prompts import PromptTemplate
from langchain_core.output_parsers import JsonOutputParser
from langchain_core.pydantic_v1 import BaseModel, Field
from langchain_openai import ChatOpenAI
from dotenv import load_dotenv
from time import sleep

load_dotenv()

# gpt_model = 'gpt-4-turbo'
gpt_model = 'gpt-3.5-turbo'



# Define your desired data structure.
class Topic(BaseModel):
    topic_name: str = Field(description="name of the topic")
    description: str = Field(description="10-15 word description of the topic")



class StudyDay(BaseModel):
    day_name: str = Field(description="name of the day to study, like monday, friday")
    study_hours: int = Field(description="estimate number of hours to study that day")
    topics_to_cover: list[Topic] = Field(description="list of topics to cover on that day")



class StudyWeek(BaseModel):
    day_list: List[StudyDay] = Field(description="list of days to study in the week")


class StudyPlan(BaseModel):
    title: str = Field(description="Title of the study plan")
    week_list: List[StudyWeek] = Field(description="Total weeks of study plan")


def get_studyplan(subject, week_count, free_days, study_depth='Normal'):
    quiz_query = (f"Generate a study plan of {subject} for a total weeks of {week_count}. "
                  f"For the following day {', '.join(free_days)} each week. Level of depth should be {study_depth}")

    print(quiz_query)
    # Set up a parser + inject instructions into the prompt template.
    parser = JsonOutputParser(pydantic_object=StudyPlan)

    prompt = PromptTemplate(
        template="Answer the user query.\n{format_instructions}\n{query}\n",
        input_variables=["query"],
        partial_variables={"format_instructions": parser.get_format_instructions()},
    )

    model = ChatOpenAI(model_name=gpt_model, temperature=0.8)
    chain = prompt | model | parser

    output = chain.invoke({"query": quiz_query})

    return output


if __name__ == "__main__":
    studyplan_topic = input("Enter the topic to generate study plan: ")
    week_count = int(input("Enter the number of weeks: "))
    free_days = input("Free days: ").split(',')
    study_depth = input("Difficulty level: ")
    print("Generating the study plan....")

    output = get_studyplan(studyplan_topic, week_count, free_days, study_depth)

    print("Plan Generated...\n")
    sleep(1)
    for i, week in enumerate(output['week_list']):
        print('Week: ', i+1)
        for day in week['day_list']:
            print(f'Day: {day["day_name"]} | study hours: {day["study_hours"]}')

            for topic in day['topics_to_cover']:
                print(f'- {topic["topic_name"]}  |  {topic["description"]}')
            print('\n')

        print('\n')



    with open('plan.json', mode='w') as f:
        json.dump(output, f)
