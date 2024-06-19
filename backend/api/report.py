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
class QuizReport(BaseModel):
    remarks: str = Field(description="Remarks on my quiz attempt")
    concepts_you_understand: List[str] = Field(description="list of concepts I understand")
    concepts_you_dont_understand: List[str] = Field(description="list of concepts I need to work on")
    motivational_quote: str = Field(description="A motivational quote")





def get_report(content):
    quiz_query = (f"You are a helpful study assistant."
                  f"Based on the following information of my attempted quiz \n{content}\n"
                  f"Evaluate my attempt and provide helpful insight in detail that would "
                  f"allow me to fill my gaps and get better in the topics")

    # Set up a parser + inject instructions into the prompt template.
    parser = JsonOutputParser(pydantic_object=QuizReport)

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
    content = '''
    Title: Mastering Python Loops: For and While
    
    Question: What is the purpose of loops in Python?
    Correct Answer: To execute a block of code repeatedly"
    My Answer: To execute a block of code repeatedly"
    
    Question: Which keyword is used to declare a for loop in Python?
    Correct Answer: for
    My Answer: for
    
    Question: What does the 'while' loop do in Python?
    Correct Answer: Executes as long as a specified condition is true
    My Answer: Executes as long as a specified condition is true
    
    Question: What would you use to iterate over a list of numbers using a loop?"
    Correct Answer: for
    My Answer: switch
    
    Question: How can you exit a loop prematurely?"
    Correct Answer: break
    My Answer: break
    
    Question: What keyword allows you to skip the current iteration and continue with the next one?
    Correct Answer: continue
    My Answer: next
    
    Question: Which loop type is typically used when the number of iterations is known?
    Correct Answer: for loop
    My Answer: while loop
     '''

    content2 = '''
    Title: Mastering Python Loops: For and While

    Question: What is the purpose of loops in Python?
    My Answer: Correct 

    Question: Which keyword is used to declare a for loop in Python?
    My Answer: Correct

    Question: What does the 'while' loop do in Python?
    My Answer: Correct

    Question: What would you use to iterate over a list of numbers using a loop?"
    My Answer: Wrong

    Question: How can you exit a loop prematurely?"
    My Answer: Wrong

    Question: What keyword allows you to skip the current iteration and continue with the next one?
    My Answer: didn't know

    Question: Which loop type is typically used when the number of iterations is known?
    My Answer: didn't know
     '''

    print("Generating the report....")

    output = get_report(content=content)
    print("Report Generated...\n")


    import json

    with open('report2.json', mode='w') as f:
        json.dump(output, f, indent=4)

