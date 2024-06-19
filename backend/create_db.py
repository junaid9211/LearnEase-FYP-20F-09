from api import create_app, db
import api.models

app = create_app()
with app.app_context():
    db.create_all()