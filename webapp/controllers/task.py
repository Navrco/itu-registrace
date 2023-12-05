#Project: Poznamky
#File: task.py
#Brief: Task controller
#
#Authors:
#Rostislav Navratil (xnavra72)

from flask import jsonify
from webapp.models import Task
from webapp.controllers.user import validUser
from webapp import db

#Task creating
def create(req):
    user = validUser(req.cookies)
    if(not(user)):
        return '', 401
    data = req.get_json()

    #Validates if task text is not empty
    stms = (data and 'text' in data)
    if(not(stms)):
        return '', 400

    #Creates new task in database
    task = Task(
        userId=user.id,
        text=data['text'],
    )
    db.session.add(task)
    db.session.commit()

    #Returs newly created task id
    payload = {'id':task.id}
    return jsonify(payload), 201


#Task reading
def get(req):
    user = validUser(req.cookies)
    if(not(user)):
        return '', 401

    #Gets all tasks that belong to user
    tasks = db.session.query(Task).filter(
        Task.userId.like(user.id)
    ).order_by(Task.id.desc()).all()

    db.session.commit()
    data = []

    #Mapping
    for task in tasks:
        data.append({
                'id': task.id,
                'text': task.text,
                'done': task.done
            })

    return jsonify(data), 200


#Task state updating
def finish(req):
    user = validUser(req.cookies)
    if(not(user)):
        return '', 401

    data = req.get_json()

    #Checks if id is supplied
    stms = (data and 'id' in data and type(data['id']) == int)
    if(not(stms)):
        return '', 400

    #Finds task
    task = db.session.query(Task).filter(
        Task.id.like(data['id']),
        Task.userId.like(user.id)
    ).first()
    db.session.commit()

    if(not(task)):
        return '', 404

    #Switches task state
    task.done = not(task.done);
    db.session.commit()

    return '', 200


#Task data updating
def update(req):
    user = validUser(req.cookies)
    if(not(user)):
        return '', 401

    data = req.get_json()

    #Validates data
    stms = (data and 'id' in data and type(data['id']) == int and 'text' in data)
    if(not(stms)):
        return '', 400


    #Finds task to be edited
    task = db.session.query(Task).filter(
        Task.id.like(data['id']),
        Task.userId.like(user.id)
    ).first()
    db.session.commit()

    if(not(task)):
        return '', 404

    #Updates task
    task.text = data['text']
    db.session.commit()
    return '', 200


#Task deleting
def delete(req):
    user = validUser(req.cookies)
    if(not(user)):
        return '', 401

    #Removes all tasks that are done
    db.session.query(Task).filter(Task.done.isnot(False)).delete()
    db.session.commit()
    return '',200

