#Project: Poznamky
#File: note.py
#Brief: Note controller
#
#Authors:
#Jakub Vales (xvales04)

from flask import jsonify
from webapp.models import Note
from webapp.controllers.user import validUser
from webapp import db

#Note creating
def create(req):
    user = validUser(req.cookies)
    if(not(user)):
        return '', 401
    data = req.get_json()
    #Validates data
    stms = (data and 'title' in data and 'text' in data)
    if(not(stms)):
        return '', 400
    #Creating new note in db
    note = Note(
        userId=user.id,
        title=data['title'],
        text=data['text']
    )
    db.session.add(note)
    db.session.commit()
    #Returns added note data
    payload = {'id':note.id}
    return jsonify(payload), 201

#Note reading
def get(req):
    user = validUser(req.cookies)
    if(not(user)):
        return '', 401

    #Checks if search by title is needed
    arg = req.args.get('search')
    if(not(arg) or type(arg) != str):
        arg = ''

    #Finds all notes by user id
    notes = db.session.query(Note).filter(
        Note.userId.like(user.id),
        Note.title.ilike('%' + arg + '%')
    ).all()
    db.session.commit()
    #Mapping data
    data = []
    for note in notes:
        data.append({
                'id': note.id,
                'title': note.title,
                'text': note.text
            })

    return jsonify(data), 200

#Note updating
def update(req):
    user = validUser(req.cookies)
    if(not(user)):
        return '', 401

    data = req.get_json()
    #Validates data
    stms = (data and 'id' in data and type(data['id']) == int and 'title' in data and 'text' in data)
    if(not(stms)):
        return '', 400

    #Finds note to update
    note = db.session.query(Note).filter(
        Note.id.like(data['id']),
        Note.userId.like(user.id)
    ).first()
    db.session.commit()

    #Invalid note id
    if(not(note)):
        return '', 404

    #Updating note title and text
    note.title = data['title']
    note.text = data['text']

    db.session.commit()
    return '', 200

#Note deleting
def delete(req):
    user = validUser(req.cookies)
    if(not(user)):
        return '', 401

    data = req.get_json()
    #Data validation
    stms = (data and 'id' in data and type(data['id']) == int)
    if(not(stms)):
        return '', 404

    #Finds note to delete
    note = db.session.query(Note).filter(
        Note.id.like(data['id']),
        Note.userId.like(user.id)
    ).first()
    db.session.commit()

    #Invalid note id
    if(not(note)):
        return '', 404

    db.session.delete(note)
    db.session.commit()
    return '',200
