from api import db
import json
from .utils import get_current_time_iso
from random import shuffle


# Model for StudyPlan
class StudyPlan(db.Model):
    __tablename__ = 'studyplan'  # Specify the custom table name here

    id           = db.Column(db.Integer,      primary_key=True)
    timestamp    = db.Column(db.String(50),   nullable=False, default=get_current_time_iso())
    title        = db.Column(db.String(200),  nullable=False)
    week_list    = db.relationship('StudyPlanWeek', backref='studyplan', cascade="all, delete-orphan")

    def to_dict(self):
        day_count = 0
        for week in self.week_list:
            for day in week.day_list:
                day_count += 1

        return {
            'id':          self.id,
            'timestamp':   self.timestamp,
            'title': self.title,
            'day_count': day_count,
            'week_list': [w.to_dict() for w in self.week_list]
        }



# Model for StudyPlanWeek
class StudyPlanWeek(db.Model):
    __tablename__ = 'studyplanWeek'  # Specify the custom table name here

    id      = db.Column(db.Integer, primary_key=True)
    plan_id = db.Column(db.Integer, db.ForeignKey('studyplan.id'), nullable=False)
    day_list = db.relationship('StudyPlanDay', backref='week', cascade="all, delete-orphan")


    def to_dict(self):
        return {
            'id': self.id,
            'plan_id': self.plan_id,
            'day_list': [d.to_dict() for d in self.day_list],
        }



# Model for StudyPlanDay
class StudyPlanDay(db.Model):
    __tablename__ = 'studyplanDay'  # Specify the custom table name here

    id               = db.Column(db.Integer, primary_key=True)
    week_id          = db.Column(db.Integer, db.ForeignKey('studyplanWeek.id'), nullable=False)
    study_hours      = db.Column(db.Integer, nullable=False)
    day_name         = db.Column(db.String(500), nullable=False)
    topics_to_cover  = db.Column(db.String(1000), nullable=False)



    def to_dict(self):
        return {
            'id': self.id,
            'week_id': self.week_id,
            'day_name': self.day_name,
            'study_hours': self.study_hours,
            'topics_to_cover': json.loads(self.topics_to_cover)
        }



# Model for FlashcardSet
class FlashcardSetModel(db.Model):
    __tablename__ = 'flashCardSet'  # Specify the custom table name here

    id           = db.Column(db.Integer,      primary_key=True)
    timestamp    = db.Column(db.String(50),   nullable=False, default=get_current_time_iso())
    title        = db.Column(db.String(200),  nullable=False)
    description  = db.Column(db.String(500),  nullable=False)
    flashcards   = db.relationship('FlashcardModel', backref='flashcard_set', cascade="all, delete-orphan")

    def to_dict(self):
        return {
            'id':          self.id,
            'timestamp':   self.timestamp,
            'title': self.title,
            'description': self.description,
            'flashcards': [f.to_dict() for f in self.flashcards]
        }


# Model for Flashcard
class FlashcardModel(db.Model):
    __tablename__ = 'flashcard'  # Specify the custom table name here

    id      = db.Column(db.Integer, primary_key=True)
    flashcard_set_id = db.Column(db.Integer, db.ForeignKey('flashCardSet.id'), nullable=False)
    front     = db.Column(db.String(500), nullable=False)
    back      = db.Column(db.String(500), nullable=False)



    def to_dict(self):
        return {
            'id': self.id,
            'flashcard_set_id': self.flashcard_set_id,
            'front': self.front,
            'back': self.back
        }




# Model for Summary
class SummaryModel(db.Model):
    __tablename__ = 'summary'  # Specify the custom table name here

    id           = db.Column(db.Integer,      primary_key=True)
    timestamp    = db.Column(db.String(50),   nullable=False, default=get_current_time_iso())
    video_title  = db.Column(db.String(200),  nullable=False)
    video_link   = db.Column(db.String(200),  nullable=False)
    heading      = db.Column(db.String(300),  nullable=False)
    content      = db.Column(db.String(1000), nullable=False)
    points       = db.Column(db.String(1000), nullable=False)


    def to_dict(self):
        return {
            'id':          self.id,
            'timestamp':   self.timestamp,
            'video_title': self.video_title,
            'video_link':  self.video_link,
            'heading':     self.heading,
            'content':     self.content,
            'points':      json.loads(self.points),
        }



# Model for Category
class CategoryModel(db.Model):
    __tablename__ = 'category'  # Specify the custom table name here

    id     = db.Column(db.Integer,       primary_key=True)
    name   = db.Column(db.String(100),   nullable=False, unique=True)
    color  = db.Column(db.String(50),    nullable=False)

    chats  = db.relationship('ChatModel', backref='category', lazy=True)


    def to_dict(self):
        return {
            "id":    self.id,
            "name":  self.name,
            "color": self.color
        }




# Model for Chat
class ChatModel(db.Model):
    __tablename__ = 'chat'  # Specify the custom table name here

    id           = db.Column(db.Integer,      primary_key=True)
    category_id  = db.Column(db.Integer,     db.ForeignKey('category.id'), nullable=False)

    timestamp    = db.Column(db.String(50),  nullable=False, default=get_current_time_iso())
    title        = db.Column(db.String(100), nullable=True)
    favorite     = db.Column(db.Boolean,     nullable=False, default=False, )

    messages     = db.relationship('MessageModel', backref='chat', cascade="all, delete-orphan")
    quizzes      = db.relationship('QuizModel',    backref='chat', cascade="all, delete-orphan")
    text_quizzes      = db.relationship('TextQuizModel',    backref='chat', cascade="all, delete-orphan")

    def to_dict(self):
        return {
            'id': self.id,
            'category_id': self.category_id,
            'category': self.category.to_dict(),
            'timestamp':   self.timestamp,
            'title':       self.title,
            'favorite':    self.favorite,
            'messages':    [m.to_dict() for m in self.messages],
            'quizzes':     [q.to_dict() for q in self.quizzes]

        }



# Model for Message
class MessageModel(db.Model):
    __tablename__ = 'message'  # Specify the custom table name here

    id      = db.Column(db.Integer, primary_key=True)
    chat_id = db.Column(db.Integer, db.ForeignKey('chat.id'), nullable=False)

    timestamp = db.Column(db.String(50),   nullable=False, default=get_current_time_iso())
    role      = db.Column(db.String(50),   nullable=False)
    content   = db.Column(db.String(3000), nullable=False)



    def to_dict(self):
        return {
            'id':        self.id,
            'chat_id':   self.chat_id,
            'timestamp': self.timestamp,
            'role':      self.role,
            'content':   self.content
        }



# Model for Chat
class QuizModel(db.Model):
    __tablename__ = 'quiz'  # Specify the custom table name here

    id      = db.Column(db.Integer, primary_key=True)
    chat_id = db.Column(db.Integer, db.ForeignKey('chat.id'), nullable=False)

    timestamp  = db.Column(db.String(50),  nullable=False, default=get_current_time_iso())
    title      = db.Column(db.String(100), nullable=False)

    problems   = db.relationship('ProblemModel', backref='quiz', cascade="all, delete-orphan")
    attempts   = db.relationship('AttemptModel', backref='quiz', cascade="all, delete-orphan")


    def to_dict(self):
        return {
            'id':        self.id,
            'chat_id':   self.chat_id,
            'timestamp': self.timestamp,
            'title':     self.title,
            'problems':  [p.to_dict() for p in self.problems],
            'attempts':  [a.to_dict() for a in self.attempts]
        }



# Model for Chat
class ProblemModel(db.Model):
    __tablename__ = 'problem'  # Specify the custom table name here

    id      = db.Column(db.Integer, primary_key=True)
    quiz_id = db.Column(db.Integer, db.ForeignKey('quiz.id'), nullable=False)

    question                   = db.Column(db.String(500), nullable=False)
    options                    = db.Column(db.String(500), nullable=False)
    correct_answer             = db.Column(db.String(500), nullable=False)
    correct_answer_explanation = db.Column(db.String(500), nullable=False)


    def to_dict(self):
        options = json.loads(self.options)
        shuffle(options)
        correct_answer_index = options.index(self.correct_answer)
        return {
            'id':                         self.id,
            'quiz_id':                    self.quiz_id,
            'question':                   self.question,
            'options':                    options,
            'correct_answer':             self.correct_answer,
            'correct_answer_index':       correct_answer_index,
            'correct_answer_explanation': self.correct_answer_explanation
        }



# Model for Attempt
class AttemptModel(db.Model):
    __tablename__ = 'attempt'  # Specify the custom table name here

    id          = db.Column(db.Integer, primary_key=True)
    quiz_id     = db.Column(db.Integer, db.ForeignKey('quiz.id'), nullable=False)

    timestamp   = db.Column(db.String(30), nullable=False, default=get_current_time_iso())
    score       = db.Column(db.Integer,    nullable=False)

    choices     = db.relationship('ChoiceModel', backref='attempt', cascade="all, delete-orphan")
    report      = db.relationship('ReportModel', backref='attempt', cascade="all, delete-orphan")

    def to_dict(self):
        return {
            'id':        self.id,
            'quiz_id':   self.quiz_id,
            'timestamp': self.timestamp,
            'score':     self.score,
            'choices':   [c.to_dict() for c in self.choices],
            'report':    [r.to_dict() for r in self.report],

        }



# Model for Report
class ChoiceModel(db.Model):
    __tablename__ = 'choice'
    id         = db.Column(db.Integer, primary_key=True)
    attempt_id = db.Column(db.Integer, db.ForeignKey('attempt.id'), nullable=False)
    problem_id = db.Column(db.Integer, db.ForeignKey('problem.id'), nullable=False)

    value      = db.Column(db.String(100), nullable=False)



    def to_dict(self):
        return {
            'id':         self.id,
            'attempt_id': self.attempt_id,
            'problem':    ProblemModel.query.filter_by(id=self.problem_id).first().to_dict(),
            'value':      self.value
        }



# Report Model
class ReportModel(db.Model):
    id                           = db.Column(db.Integer, primary_key=True)
    attempt_id                   = db.Column(db.Integer, db.ForeignKey('attempt.id'), nullable=False)

    remarks                      = db.Column(db.String(1000), nullable=False)
    concepts_you_understand      = db.Column(db.String(1000), nullable=False)
    concepts_you_dont_understand = db.Column(db.String(1000), nullable=False)
    motivational_quote           = db.Column(db.String(500),  nullable=False)


    def to_dict(self):
        return {
            'id':                           self.id,
            'attempt_id':                   self.attempt_id,
            'remarks':                      self.remarks,
            'concepts_you_understand':      json.loads(self.concepts_you_understand),
            'concepts_you_dont_understand': json.loads(self.concepts_you_dont_understand),
            'motivational_quote':           self.motivational_quote
        }



# Model for pdf file
class BookModel(db.Model):
    __tablename__ = 'book'  # Specify the custom table name here

    id = db.Column(db.Integer, primary_key=True)
    timestamp          = db.Column(db.String(30), nullable=False, default=get_current_time_iso())

    vectorstore_path    = db.Column(db.String(500), nullable=False)
    cover_path         = db.Column(db.String(500), nullable=False)
    pdf_path           = db.Column(db.String(500), nullable=False)

    messages           = db.relationship('BookMessageModel', backref='book', cascade="all, delete-orphan")


    def to_dict(self):
        return {
            'id': self.id,
            'timestamp': self.timestamp,
            'cover_path': self.cover_path,
            'pdf_path': self.pdf_path,
            'vectorstore_path': self.vectorstore_path,
            'messages': [m.to_dict() for m in self.messages],
        }



# Model for Message
class BookMessageModel(db.Model):
    __tablename__ = 'book_message'  # Specify the custom table name here

    id      = db.Column(db.Integer, primary_key=True)
    book_id = db.Column(db.Integer, db.ForeignKey('book.id'), nullable=False)

    timestamp = db.Column(db.String(50),   nullable=False, default=get_current_time_iso())
    role      = db.Column(db.String(50),   nullable=False)
    content   = db.Column(db.String(3000), nullable=False)



    def to_dict(self):
        return {
            'id':        self.id,
            'book_id':   self.book_id,
            'timestamp': self.timestamp,
            'role':      self.role,
            'content':   self.content
        }











# Model for Chat
class TextQuizModel(db.Model):
    __tablename__ = 'text_quiz'  # Specify the custom table name here

    id      = db.Column(db.Integer, primary_key=True)
    chat_id = db.Column(db.Integer, db.ForeignKey('chat.id'), nullable=False)

    timestamp  = db.Column(db.String(50),  nullable=False, default=get_current_time_iso())
    title      = db.Column(db.String(100), nullable=False)

    problems   = db.relationship('TextProblemModel', backref='quiz', cascade="all, delete-orphan")
    attempts   = db.relationship('TextAttemptModel', backref='quiz', cascade="all, delete-orphan")


    def to_dict(self):
        return {
            'id':        self.id,
            'chat_id':   self.chat_id,
            'timestamp': self.timestamp,
            'title':     self.title,
            'problems':  [p.to_dict() for p in self.problems],
            'attempts':  [a.to_dict() for a in self.attempts]
        }



# Model for Chat
class TextProblemModel(db.Model):
    __tablename__ = 'text_problem'  # Specify the custom table name here

    id      = db.Column(db.Integer, primary_key=True)
    quiz_id = db.Column(db.Integer, db.ForeignKey('text_quiz.id'), nullable=False)

    question                   = db.Column(db.String(500), nullable=False)
    correct_answer             = db.Column(db.String(500), nullable=False)
    correct_answer_explanation = db.Column(db.String(500), nullable=False)


    def to_dict(self):
        return {
            'id':                         self.id,
            'quiz_id':                    self.quiz_id,
            'question':                   self.question,
            'correct_answer':             self.correct_answer,
            'correct_answer_explanation': self.correct_answer_explanation
        }



# Model for Attempt
class TextAttemptModel(db.Model):
    __tablename__ = 'text_attempt'  # Specify the custom table name here

    id          = db.Column(db.Integer, primary_key=True)
    quiz_id     = db.Column(db.Integer, db.ForeignKey('text_quiz.id'), nullable=False)

    timestamp   = db.Column(db.String(30), nullable=False, default=get_current_time_iso())
    score       = db.Column(db.Integer,    nullable=False)

    choices     = db.relationship('TextChoiceModel', backref='attempt', cascade="all, delete-orphan")
    report      = db.relationship('TextReportModel', backref='attempt', cascade="all, delete-orphan")

    def to_dict(self):
        return {
            'id':        self.id,
            'quiz_id':   self.quiz_id,
            'timestamp': self.timestamp,
            'score':     self.score,
            'choices':   [c.to_dict() for c in self.choices],
            'report':    [r.to_dict() for r in self.report],

        }



# Model for Report
class TextChoiceModel(db.Model):
    __tablename__ = 'text_choice'
    id         = db.Column(db.Integer, primary_key=True)
    attempt_id = db.Column(db.Integer, db.ForeignKey('text_attempt.id'), nullable=False)
    problem_id = db.Column(db.Integer, db.ForeignKey('text_problem.id'), nullable=False)

    value      = db.Column(db.String(100), nullable=False)



    def to_dict(self):
        return {
            'id':         self.id,
            'attempt_id': self.attempt_id,
            'problem':    TextProblemModel.query.filter_by(id=self.problem_id).first().to_dict(),
            'value':      self.value
        }



# Report Model
class TextReportModel(db.Model):
    __tablename__ = 'text_report'

    id                           = db.Column(db.Integer, primary_key=True)
    attempt_id                   = db.Column(db.Integer, db.ForeignKey('text_attempt.id'), nullable=False)

    remarks                      = db.Column(db.String(1000), nullable=False)
    concepts_you_understand      = db.Column(db.String(1000), nullable=False)
    concepts_you_dont_understand = db.Column(db.String(1000), nullable=False)
    motivational_quote           = db.Column(db.String(500),  nullable=False)


    def to_dict(self):
        return {
            'id':                           self.id,
            'attempt_id':                   self.attempt_id,
            'remarks':                      self.remarks,
            'concepts_you_understand':      json.loads(self.concepts_you_understand),
            'concepts_you_dont_understand': json.loads(self.concepts_you_dont_understand),
            'motivational_quote':           self.motivational_quote
        }

