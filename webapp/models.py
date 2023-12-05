#Project: Poznamky
#File: models.py
#Brief: Models definiton and database creation
#
#Authors:
#Rostislav Navratil (xnavra72)
#David Nevrlka (xnevrl00)
#Jakub Vales (xvales04)

from webapp import app,db

#Needed for mapping other models data to exact user
class User(db.Model):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True)
    token = db.Column(db.String)
    notes = db.relationship('Note', backref='person', lazy=True)

class Reminder(db.Model):
    __tablename__ = 'reminders'
    id = db.Column(db.Integer, primary_key=True)
    userId = db.Column(db.Integer, db.ForeignKey('users.id'))
    year = db.Column(db.Integer)
    month = db.Column(db.Integer)
    day = db.Column(db.Integer)
    hours = db.Column(db.Integer)
    minutes = db.Column(db.Integer)
    entireDay = db.Column(db.Boolean)
    text = db.Column(db.Text)

class Note(db.Model):
    __tablename__ = 'notes'
    id = db.Column(db.Integer, primary_key=True)
    userId = db.Column(db.Integer, db.ForeignKey('users.id'))
    title = db.Column(db.String)
    text = db.Column(db.Text)

class Task(db.Model):
    __tablename__ = 'tasks'
    id = db.Column(db.Integer, primary_key=True)
    userId = db.Column(db.Integer, db.ForeignKey('users.id'))
    text = db.Column(db.Text)
    done = db.Column(db.Boolean, default=False)


#with app.app_context():
#db.create_all()
with app.app_context():
    db.create_all()
