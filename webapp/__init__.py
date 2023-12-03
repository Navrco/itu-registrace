#!/usr/bin/env python
# -*- coding: utf-8 -*-

from flask import Flask, request, send_from_directory
from flask_sqlalchemy import SQLAlchemy

import logging,sys
logging.getLogger('werkzeug').setLevel(logging.ERROR)

#app = Flask(__name__, static_url_path='', static_folder='public')
app = Flask(__name__, static_url_path='', static_folder='publicDev')

app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///data/main.sqlite3'
app.config['SEND_FILE_MAX_AGE_DEFAULT'] = 0

db = SQLAlchemy()
db.init_app(app)

#Flask-SQLAlchemy==1.0
#Flask==0.12.5
#jinja2==3.0.3

#SQLAlchemy==1.0.10


from webapp import routes
