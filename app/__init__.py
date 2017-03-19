from flask import Flask
from flask_sqlalchemy import SQLAlchemy

app=Flask(__name__)
app.config.from_object('config')
app.secret_key = 'A0Zr98j/3yX R~XHH!jmN]LWX/,?RT'
db=SQLAlchemy(app)

from app import views,models
