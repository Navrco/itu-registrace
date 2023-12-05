#!/usr/bin/env python
# -*- coding: utf-8 -*-

#Project: Poznamky
#File: __init__.py
#Brief: Webapp python module init file
#
#Authors:
#Rostislav Navratil (xnavra72)

from flask import Flask, request, send_from_directory
from flask_sqlalchemy import SQLAlchemy

#Logger setup in order for flask to work correctly
import logging,sys
logging.getLogger('werkzeug').setLevel(logging.ERROR)

#Initalizing flask app instance and setting react app assets folder
#app = Flask(__name__, static_url_path='', static_folder='public')
app = Flask(__name__, static_url_path='', static_folder='publicDev')

#SQLAlchemy configs
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
#SQLite database stored in webapp/data/
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///data/main.sqlite3'
app.config['SEND_FILE_MAX_AGE_DEFAULT'] = 0

db = SQLAlchemy()
db.init_app(app)


from webapp import routes
