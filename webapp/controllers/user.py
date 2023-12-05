#Project: Poznamky
#File: task.py
#Brief: User controller
#
#Authors:
#Rostislav Navratil (xnavra72)

from flask import jsonify
import uuid
from webapp.models import User
from webapp import db

def validUser(cookies):
    userToken = cookies.get('userToken')
    #Checking if cookie exists
    if(not(userToken)):
        return False
    #Looking for user in db
    user = db.session.query(User).filter_by(token=userToken).first()
    db.session.commit()
    #Checking if user exists
    if(user):
        return user
    return False


def cookie(req):
    #Validating if user exists
    user = validUser(req.cookies)
    if(user):
        data = { "exists": True }
        return jsonify(data),200

    #Creating new user with token
    token = str(uuid.uuid4())
    user = User(token=token)
    db.session.add(user)
    db.session.commit()
    data = {
        "exists": False,
        "userToken": token,
    }
    return jsonify(data),201
