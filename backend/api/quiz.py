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
class Problem(BaseModel):
    question: str = Field(description="a 4 choice multiple choice question")
    correct_answer: str = Field(description="correct answer of the question")
    incorrect_answer1: str = Field(description="incorrect answer 1 of the question")
    incorrect_answer2: str = Field(description="incorrect answer 2 of the question")
    incorrect_answer3: str = Field(description="incorrect answer 3 of the question")
    correct_answer_explanation: str = Field(description="explanation for correct answer")


class Quiz(BaseModel):
    quiz_title: str = Field(description="heading for the quiz containing 5-10 words")
    problem_list: List[Problem] = Field(description="a list of Problems")



# And a query intented to prompt a language model to populate the data structure.

def get_quiz(content, question_count):
    quiz_query = (f"You are a helpful study assistant."
                  f"Based on the following content {content}"
                  f"Generate a multiple choice quiz of {question_count} to practice, "
                  f"understand and retain the material")

    # Set up a parser + inject instructions into the prompt template.
    parser = JsonOutputParser(pydantic_object=Quiz)

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
    Loops in Python are control structures that allow you to execute a block of code repeatedly. There are two main types of loops in Python: `for` loops and `while` loops.

1. **For Loops**:
   - A `for` loop is used to iterate over a sequence (e.g., a list, tuple, string, or range).
   - It executes a block of code for each item in the sequence.
   - The syntax of a `for` loop in Python is as follows:

     ```python
     for item in sequence:
         # Code block to be executed for each item
     ```

   - Here, `item` represents the current item in the sequence being iterated over, and `sequence` is the sequence of items.

   Example:
   ```python
   numbers = [1, 2, 3, 4, 5]
   for num in numbers:
       print(num)
   ```

2. **While Loops**:
   - A `while` loop is used to repeatedly execute a block of code as long as a specified condition is true.
   - It continues iterating until the condition becomes false.
   - The syntax of a `while` loop in Python is as follows:

     ```python
     while condition:
         # Code block to be executed while the condition is true
     ```

   - Here, `condition` is the expression that evaluates to either `True` or `False`.

   Example:
   ```python
   count = 0
   while count < 5:
       print(count)
       count += 1
   ```

In both types of loops, you can use control flow statements like `break` to exit the loop prematurely, `continue` to skip the current iteration and move to the next one, and `else` to execute a block of code when the loop completes without encountering a `break` statement.

Loops are fundamental for iterating over data structures, performing repetitive tasks, and implementing algorithms in Python. They provide a powerful mechanism for automating tasks and processing data efficiently.
    
    '''
    question_count = 10
    print("Generating the quiz....")

    output = get_quiz(content=content, question_count=question_count)
    print("Quiz Generated...\n")
    sleep(1)
    for i, item in enumerate(output['problem_list']):
        print(i+1, item['question'])
        print('a.', item['correct_answer'])
        print('b.', item['incorrect_answer1'])
        print('c.', item['incorrect_answer2'])
        print('d.', item['incorrect_answer3'])
        print('\n')

    import json

    with open('quiz.json', mode='w') as f:
        json.dump(output, f, indent=4)

