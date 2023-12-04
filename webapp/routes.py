from flask import request, send_from_directory, redirect
from webapp import app
from webapp.controllers import user, reminder, note, task

@app.errorhandler(404)
def page_not_found(e):
    return redirect('/', code=302)

#Static files serve
@app.route('/')
def index():
    return app.send_static_file('index.html')

#User handling
@app.route('/api/user/cookie', methods=['GET'])
def userCookie():
    return user.cookie(request)


#Reminders handling
@app.route('/api/reminder/create', methods=['POST'])
def reminderCreate():
    return reminder.create(request)

@app.route('/api/reminder/get', methods=['GET'])
def reminderGet():
    return reminder.get(request)

@app.route('/api/reminder/update', methods=['PUT'])
def reminderUpdate():
    return reminder.update(request)

@app.route('/api/reminder/delete', methods=['DELETE'])
def reminderDelete():
    return reminder.delete(request)


#Notes handling
@app.route('/api/note/create', methods=['POST'])
def noteCreate():
    return note.create(request)

@app.route('/api/note/get', methods=['GET'])
def noteGet():
    return note.get(request)

@app.route('/api/note/update', methods=['PUT'])
def noteUpdate():
    return note.update(request)

@app.route('/api/note/delete', methods=['DELETE'])
def noteDelete():
    return note.delete(request)


#Tasks handling
@app.route('/api/task/create', methods=['POST'])
def taskCreate():
    return task.create(request)

@app.route('/api/task/get', methods=['GET'])
def taskGet():
    return task.get(request)

@app.route('/api/task/finish', methods=['PUT'])
def taskFinish():
    return task.finish(request)
