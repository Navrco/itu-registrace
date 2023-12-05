#Project: Poznamky
#File: reminder.py
#Brief: Reminder controller
#
#Authors:
#David Nevrlka (xnevrl00)

from flask import jsonify
from webapp.models import Reminder
from webapp.controllers.user import validUser
from webapp import db

#Returs if value is integer in given range
def validInt(val,maxVal,minVal):
    return (not(val is None)and isinstance(val,int) and val <= maxVal and val >= minVal)

#Returns true if given string is integer
def tryGetInt(x):
    if(x == '0'):
        return True
    if(not(x) and x != '0'):
        return False
    try:
        return int(x)
    except ValueError:
        return False

#Reminder creating
def create(req):
    user = validUser(req.cookies)
    if(not(user)):
        return '', 401

    data = req.get_json()

    #Validating year month day
    stms = (data and data['text'] != '' and validInt(data['year'],2100,2000) and validInt(data['month'],11,0) and validInt(data['day'],31,0))
    if(not(stms)):
        return '', 400
    #Validating entire day selection
    stms = (data['entireDay'] and isinstance(data['entireDay'],bool))
    if(stms):
        data['hours'],data['minutes'] = 0,0
    else:
        #If entire day is not selected validates hours and minutes
        stms = (validInt(data['hours'],23,0) and validInt(data['minutes'],59,0))
        if(not(stms)):
            return '', 400

    #Creates new reminder instance
    reminder = Reminder(
        userId=user.id,
        year = data['year'],
        month = data['month'],
        day = data['day'],
        hours = data['hours'],
        minutes = data['minutes'],
        entireDay = data['entireDay'],
        text = data['text']
    )

    db.session.add(reminder)
    db.session.commit()

    #Retuns newly created reminder
    payload = {'id':reminder.id}
    return jsonify(payload), 201

#Reminder reading
def get(req):
    user = validUser(req.cookies)
    if(not(user)):
        return '', 401

    #Gets year and month to which reminders are requested
    args = {
        'year': req.args.get('year'),
        'month': req.args.get('month')
    }

    #Validates year and month
    stms = (validInt(tryGetInt(args['year']),2100,2000) and validInt(tryGetInt(args['month']),11,0))
    if(not(stms)):
        return '', 400

    #Finds matching reminders for user
    reminders = db.session.query(Reminder).filter(
        Reminder.userId.like(user.id),
        Reminder.year.like(args['year']),
        Reminder.month.like(args['month'])
    ).order_by(Reminder.hours.desc()).all()

    db.session.commit()
    data = []

    #Mapping to response model
    for reminder in reminders:
        data.append({
                'id': reminder.id,
                'day': reminder.day,
                'entireDay': reminder.entireDay,
                'hours': reminder.hours,
                'minutes': reminder.minutes,
                'text': reminder.text
            })

    return jsonify(data), 200

#Reminder updating
def update(req):
    user = validUser(req.cookies)
    if(not(user)):
        return '', 401

    data = req.get_json()

    #Validates data
    stms = (data and 'id' in data and type(data['id']) == int and 'text' in data)
    if(not(stms)):
        return '', 400

    #Finds existing reminder
    reminder = db.session.query(Reminder).filter(
        Reminder.id.like(data['id']),
        Reminder.userId.like(user.id)
    ).first()
    db.session.commit()

    if(not(reminder)):
        return '', 404

    #Updates reminder text
    reminder.text = data['text']
    db.session.commit()

    return '', 200


#Reminder deleting
def delete(req):
    user = validUser(req.cookies)
    if(not(user)):
        return '', 401

    data = req.get_json()
    #Validates year month day
    stms = (data and data['id'] and isinstance(data['id'],int))
    if(not(stms)):
        return '', 400

    #Finds reminder thats needs to be deleted
    reminder = db.session.query(Reminder).filter(
        Reminder.id.like(data['id']),
        Reminder.userId.like(user.id)
    ).first()
    db.session.commit()

    if(not(reminder)):
        return '', 404

    db.session.delete(reminder)
    db.session.commit()


    return '',200
