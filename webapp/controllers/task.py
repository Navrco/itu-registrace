from flask import jsonify
from webapp.models import Task
from webapp.controllers.user import validUser
from webapp import db

def create(req):
    user = validUser(req.cookies)
    if(not(user)):
        return '', 401
    data = req.get_json()
    stms = (data and 'text' in data)
    if(not(stms)):
        return '', 400
    #Creating new Note in db
    task = Task(
        userId=user.id,
        text=data['text'],
    )
    db.session.add(task)
    db.session.commit()
    payload = {'id':task.id}
    return jsonify(payload), 201


def get(req):
    user = validUser(req.cookies)
    if(not(user)):
        return '', 401

    tasks = db.session.query(Task).filter(
        Task.userId.like(user.id)
    ).order_by(Task.id.desc()).all()

    db.session.commit()
    data = []
    for task in tasks:
        data.append({
                'id': task.id,
                'text': task.text,
                'done': task.done
            })

    return jsonify(data), 200


def finish(req):
    user = validUser(req.cookies)
    if(not(user)):
        return '', 401

    data = req.get_json()
    stms = (data and 'id' in data and type(data['id']) == int)
    if(not(stms)):
        return '', 400

    task = db.session.query(Task).filter(
        Task.id.like(data['id']),
        Task.userId.like(user.id)
    ).first()
    db.session.commit()

    if(not(task)):
        return '', 404

    task.done = not(task.done);
    db.session.commit()
    return '', 200
