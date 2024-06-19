from .summary_resource import SummaryGenerate, SummaryFetch, AllSummaries
from .attempt_resource import CreateReport
from .category_resource import UpdateCategory, DeleteCategory, CreateCategory, GetAllCategories
from .chat_resource import ChatGet, ChatCreate, ChatUpdate, ChatDelete, GenerateChatResponse, QueryChats, GellAllChats
from .quiz_resource import CreateQuiz, FetchQuiz, FetchAllQuizzes
from .flashcard_resource import CreateFlashcards, GetFlashCardSet, GetAllFlashCardSet
from .plan_resourse import CreatePlan, GetPlan, GetAllPlans, PushEvents
from .pdf_resource import FileUpload, GetBookResponse, FetchAllBooks, FetchBook
def initialize_routes(api):

    # Category
    api.add_resource(CreateCategory,    '/create-category')
    api.add_resource(UpdateCategory,    '/update-category/<int:category_id>')
    api.add_resource(GetAllCategories,  '/get-categories')
    api.add_resource(DeleteCategory,    '/get-category/<int:category_id>')

    # Chat
    api.add_resource(ChatCreate,      '/generate-chat')
    api.add_resource(ChatUpdate,      '/update-chat/<int:chat_id>')
    api.add_resource(ChatGet,         '/get-chat/<int:chat_id>')
    api.add_resource(QueryChats,      '/query-chats')
    api.add_resource(GellAllChats,    '/get-all-chats')
    api.add_resource(ChatDelete,      '/delete-chat/<int:chat_id>')
    api.add_resource(GenerateChatResponse, '/get-message-response')

    # Summary
    api.add_resource(SummaryGenerate, '/generate-summary')
    api.add_resource(SummaryFetch,    '/get-summary/<int:summary_id>')
    api.add_resource(AllSummaries,    '/get-summaries')

    # Quiz
    api.add_resource(CreateQuiz,   '/generate-quiz-from-chat/<int:chat_id>')
    api.add_resource(FetchQuiz,    '/fetch-quiz/<int:quiz_id>')
    api.add_resource(FetchAllQuizzes, '/fetch-all-quizzes')

    # Report
    api.add_resource(CreateReport, '/create_report')

    # Flashcard set
    api.add_resource(CreateFlashcards,   '/create-flashcards')
    api.add_resource(GetFlashCardSet,    '/get-flashcards/<int:flashcards_set_id>')
    api.add_resource(GetAllFlashCardSet, '/get-all-flashcards')

    # Study Plan
    api.add_resource(CreatePlan,   '/create-studyplan')
    api.add_resource(GetPlan,    '/get-studyplan/<int:plan_id>')
    api.add_resource(GetAllPlans, '/get-all-studyplans')
    api.add_resource(PushEvents, '/push-events/<int:plan_id>')

    api.add_resource(FileUpload, '/book-upload')
    api.add_resource(FetchAllBooks, '/get-all-books')
    api.add_resource(FetchBook,    '/book/<int:book_id>')
    api.add_resource(GetBookResponse, '/get-book-response')

    # Text Quiz
    # api.add_resource(CreateQuiz,   '/generate-text-quiz-from-chat/<int:chat_id>')
    # api.add_resource(FetchQuiz,    '/fetch-quiz/<int:quiz_id>')
    # api.add_resource(FetchAllQuizzes, '/fetch-all-text-quizzes')
