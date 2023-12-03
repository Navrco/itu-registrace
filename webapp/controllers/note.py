from flask import jsonify
from webapp.models import Note
from webapp.controllers.user import validUser
from webapp import db

def create(req):
    user = validUser(req.cookies)
    if(not(user)):
        return '', 401
    data = req.get_json()
    stms = (data and 'title' in data and 'text' in data)
    if(not(stms)):
        return '', 400
    #Creating new Note in db
    note = Note(
        userId=user.id,
        title=data['title'],
        text=data['text']
    )
    db.session.add(note)
    db.session.commit()
    payload = {'id':note.id}
    return jsonify(payload), 201

def get(req):
    user = validUser(req.cookies)
    if(not(user)):
        return '', 401

    arg = req.args.get('search')
    if(not(arg) or type(arg) != str):
        arg = ''

    notes = db.session.query(Note).filter(
        Note.userId.like(user.id),
        Note.title.ilike('%' + arg + '%')
    ).all()
    db.session.commit()
    data = []
    for note in notes:
        data.append({
                'id': note.id,
                'title': note.title,
                'text': note.text
            })

    return jsonify(data), 200


def update(req):
    user = validUser(req.cookies)
    if(not(user)):
        return '', 401

    data = req.get_json()
    stms = (data and 'id' in data and type(data['id']) == int and 'title' in data and 'text' in data)
    if(not(stms)):
        return '', 400

    note = db.session.query(Note).filter(
        Note.id.like(data['id']),
        Note.userId.like(user.id)
    ).first()
    db.session.commit()

    if(not(note)):
        return '', 404

    note.title = data['title']
    note.text = data['text']
    db.session.commit()
    return '', 200

def delete(req):
    user = validUser(req.cookies)
    if(not(user)):
        return '', 401

    data = req.get_json()
    stms = (data and 'id' in data and type(data['id']) == int)
    if(not(stms)):
        return '', 404

    note = db.session.query(Note).filter(
        Note.id.like(data['id']),
        Note.userId.like(user.id)
    ).first()
    db.session.commit()

    if(not(note)):
        return '', 404

    db.session.delete(note)
    db.session.commit()
    return '',200












    #
