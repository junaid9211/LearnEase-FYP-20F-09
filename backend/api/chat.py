from langchain.prompts import PromptTemplate
from langchain_openai import ChatOpenAI
from langchain.memory import ChatMessageHistory, ConversationSummaryBufferMemory
from langchain.schema.messages import HumanMessage, AIMessage
from langchain.chains import LLMChain

from dotenv import load_dotenv

load_dotenv()

# gpt_model = 'gpt-4o'
gpt_model = 'gpt-3.5-turbo'


def get_chat_reponse(user_msg, chat_messages=None, tone_choice=None):
    template = """
    You are an expert study tutor. explain the topics in detail in 500-700 words
    {chat_history}
    Human: {human_input} Keep a {tone} tone
    Chatbot:
    """
    prompt = PromptTemplate(input_variables=["chat_history", "human_input", "tone"], template=template)
    chat_gpt = ChatOpenAI(model_name=gpt_model, temperature=0.8)
    history = ChatMessageHistory()
    memory = ConversationSummaryBufferMemory(chat_memory=history, memory_key="chat_history", input_key="human_input", llm=chat_gpt)

    llm_chain = LLMChain(llm=chat_gpt, prompt=prompt, memory=memory)

    # create history from previous messages
    if chat_messages:
        for item in chat_messages:
            msg = HumanMessage(content=item['content']) if item['role'] == 'user' else AIMessage(content=item['content'])
            history.add_message(msg)

    if tone_choice is None:
        tone_choice = "Balanced"

    response = llm_chain.predict(human_input=user_msg, tone=tone_choice)
    return response
