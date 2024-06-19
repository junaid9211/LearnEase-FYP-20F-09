from dotenv import load_dotenv
from PyPDF2 import PdfReader
from langchain.text_splitter import CharacterTextSplitter

from langchain_openai import OpenAIEmbeddings
from langchain_community.vectorstores import FAISS
from langchain_openai import ChatOpenAI

from langchain.memory import ConversationBufferMemory
from langchain.chains import ConversationalRetrievalChain
import fitz


load_dotenv()


def get_pdf_text(pdf):
    text = ""

    pdf_reader = PdfReader(pdf)
    for page in pdf_reader.pages:
        text += page.extract_text()
    return text


def get_text_chunks(text):
    text_splitter = CharacterTextSplitter(
        separator="\n",
        chunk_size=2000,
        chunk_overlap=200,
        length_function=len
    )
    chunks = text_splitter.split_text(text)
    return chunks


def get_vectorstore(text_chunks):
    embeddings = OpenAIEmbeddings()
    vectorstore = FAISS.from_texts(texts=text_chunks, embedding=embeddings)
    return vectorstore


def get_conversation_chain(vectorstore):
    llm = ChatOpenAI()

    memory = ConversationBufferMemory(
        memory_key='chat_history', return_messages=True)
    conversation_chain = ConversationalRetrievalChain.from_llm(
        llm=llm,
        retriever=vectorstore.as_retriever(),
        memory=memory
    )
    return conversation_chain


def process_pdf(file_path):
    # with open(file_path, mode='rb') as f:
    #     raw_text = get_pdf_text(f)

    raw_text = get_pdf_text(file_path)
    # get the text chunks
    text_chunks = get_text_chunks(raw_text)

    # create vector store
    vectorstore = get_vectorstore(text_chunks)

    # create conversation chain
    conversation = get_conversation_chain(vectorstore)

    return conversation


def pdf_cover_to_image(pdf_path, output_image_path):
    try:
        doc = fitz.open(pdf_path)
        page = doc.load_page(0)  # number of page
        pix = page.get_pixmap()
        pix.save(output_image_path)
        doc.close()

    except Exception as e:
        print(f"An error occurred: {e}")



def get_message_response(conversation, user_question):
    response = conversation({'question': user_question})
    return response


def load_vectorstore(vectorstore_path):
    embeddings = OpenAIEmbeddings()
    vectorstore = FAISS.load_local(
        vectorstore_path,
        embeddings,
        allow_dangerous_deserialization=True)
    return vectorstore