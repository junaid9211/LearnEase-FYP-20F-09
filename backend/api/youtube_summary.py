from langchain_community.document_loaders import YoutubeLoader
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain_openai import OpenAIEmbeddings
from langchain_community.vectorstores import FAISS
from langchain.prompts import PromptTemplate
from langchain_core.output_parsers import JsonOutputParser
from langchain_core.pydantic_v1 import BaseModel, Field
from langchain_openai import ChatOpenAI

from dotenv import load_dotenv
import requests
from bs4 import BeautifulSoup

load_dotenv()

# gpt_model = 'gpt-4-turbo'
gpt_model = 'gpt-3.5-turbo'

class SummaryResponse:
    def __init__(self, title: str, content: str, points: str):
        self.title = title
        self.content = content
        self.points = points


    def to_dict(self):
        return {
            'title': self.title,
            'content': self.content,
            'points': self.points,
        }



class Summary(BaseModel):
    title: str = Field(description="title of the summary")
    content: str = Field(description="main content of the summary")
    points: list = Field(description="bullet points of the summary")


def get_youtube_video_title(link):
    r = requests.get(link)
    soup = BeautifulSoup(r.text, features='lxml')
    link = soup.find_all(name="title")[0]
    title = link.text.replace('- YouTube', '')
    return title


def create_db_from_youtube_video_url(video_url: str) -> FAISS:
    loader = YoutubeLoader.from_youtube_url(video_url)
    transcript = loader.load()
    embeddings = OpenAIEmbeddings()

    text_splitter = RecursiveCharacterTextSplitter(chunk_size=1000, chunk_overlap=100)
    docs = text_splitter.split_documents(transcript)

    db = FAISS.from_documents(docs, embeddings)
    return db


def get_response_from_query(db, query, k=5):
    parser = JsonOutputParser(pydantic_object=Summary)
    docs = db.similarity_search(query, k=k)
    docs_page_content = " ".join([d.page_content for d in docs])

    model = ChatOpenAI(model_name=gpt_model, temperature=0.8)

    prompt = PromptTemplate(
        input_variables=["question", "docs"],
        template="""
        You are a helpful assistant that that can answer questions about youtube videos 
        based on the video's transcript.

        Answer the following question: {question}
        By searching the following video transcript: {docs}
        {format_instructions}

        Your answers should be verbose and detailed.
        """,
        partial_variables={"format_instructions": parser.get_format_instructions()}
    )

    chain = prompt | model | parser

    response = chain.invoke({"question": query, "docs": docs_page_content})
    return response, docs


def get_youtube_summary(video_url: str) -> SummaryResponse:
    db = create_db_from_youtube_video_url(video_url)
    response, docs = get_response_from_query(db, query='explain the video')
    response_obj = SummaryResponse(
        title=response['title'],
        content=response['content'],
        points=response['points']
    )
    return response_obj


