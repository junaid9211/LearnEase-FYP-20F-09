from typing import List
from langchain.prompts import PromptTemplate
from langchain_core.output_parsers import JsonOutputParser
from langchain_core.pydantic_v1 import BaseModel, Field
from langchain_openai import ChatOpenAI
from dotenv import load_dotenv

load_dotenv()

# gpt_model = 'gpt-4-turbo'
gpt_model = 'gpt-3.5-turbo'


# Define your desired data structure.
class Flashcard(BaseModel):
    front: str = Field(description="front of the flashcard that contain the topic name that should be used to recall back part")
    back: str = Field(description="back of the flashcard that contains the content that needs to be memorized")


class Flashcards(BaseModel):
    title: str = Field(description="title of the flashcard list")
    description: str = Field(description="description of the flashcards set about the topics it covers of about 25-30 words")
    flashcard_list: List[Flashcard] = Field(description="a list of Flashcards")


def get_flashcards(content, question_count):
    query = (f"You are a helpful study assistant."
             f"Based on the following topic {content}"
             f"Generate flashcards {question_count} amount to memorize "
             f"important topics")

    # Set up a parser + inject instructions into the prompt template.
    parser = JsonOutputParser(pydantic_object=Flashcards)

    prompt = PromptTemplate(
        template="Answer the user query.\n{format_instructions}\n{query}\n",
        input_variables=["query"],
        partial_variables={"format_instructions": parser.get_format_instructions()},
    )

    model = ChatOpenAI(model_name=gpt_model, temperature=0.8)
    chain = prompt | model | parser

    output = chain.invoke({"query": query})

    return output


if __name__ == "__main__":
    content = 'Functions in python'
    question_count = 10
    print("Generating the flashcards....")

    output = get_flashcards(content=content, question_count=question_count)
    print("Flashcards Generated...\n")

    import json

    with open('flashcards.json', mode='w') as f:
        json.dump(output, f, indent=4)
