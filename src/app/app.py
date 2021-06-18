from flask import Flask, render_template, abort, send_from_directory, render_template, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import MetaData, desc
from flask_migrate import Migrate
from sqlalchemy import exc
import os

app = Flask(__name__)
application = app

app.config.from_pyfile('config.py')

naming_convention = {
    'pk': 'pk_%(table_name)s',
    'fk': 'fk_%(table_name)s_%(column_0_name)s_%(referred_table_name)s',
    'ix': 'ix_%(table_name)s_%(column_0_name)s',
    'uq': 'uq_%(table_name)s_%(column_0_name)s',
    'ck': 'ck_%(table_name)s_%(constraint_name)s',
}

db = SQLAlchemy(app, metadata=MetaData(naming_convention=naming_convention))
migrate = Migrate(app, db)


from models import Direction, Group, Role, Status, Semester, Type, Student, User, Image, Info, Project


from auth import bp as auth_bp, init_login_manager
from admin import bp as admin_bp
from curator import bp as curator_bp
from teamlead import bp as teamlead_bp
from project import bp as project_bp
from view import bp as view_bp

init_login_manager(app)

app.register_blueprint(auth_bp)
app.register_blueprint(admin_bp)
app.register_blueprint(curator_bp)
app.register_blueprint(teamlead_bp)
app.register_blueprint(project_bp)
app.register_blueprint(view_bp)

import json
from tools import ImageSaver

@app.route('/')
def index():
    directions = Direction.query.filter(Direction.name != 'Не указано').order_by(Direction.queue).all()
    projects = Project.query.filter(Project.status_id == 2).order_by(desc(Project.likes)).limit(9).all()
    return render_template('index.html', directions=directions, projects=projects)


@app.route('/direction', methods=['POST'])
def get_projects_by_direction_id():
    direction_id = request.form.get('direction_id', 0, type=int)
    projects = Project.query.filter(Project.status_id == 2).filter(Project.direction_id == direction_id).order_by(desc(Project.likes)).limit(9).all()
    newdata = []
    for entry in projects:
        newdata.append(entry.to_dict())

    return jsonify(newdata)


@app.route('/images/<image_id>')
def image(image_id):
    img = Image.query.get(image_id)
    if img is None:
        abort(404)
    return send_from_directory(app.config['UPLOAD_FOLDER'], img.storage_filename)


@app.route('/defposter')
def defposter():

    return send_from_directory(app.config['UPLOAD_FOLDER'], 'default_poster.svg')


@app.route('/add_image', methods=['POST'])
#@login_required
#@check_rights('create_movie')
def add_image():
    file = request.files.get('img')
    type_id = request.form.get('type_id')
    img = None
    if file and file.filename:
        img_saver = ImageSaver(file, type_id)
        img = img_saver.save()

    if img == None:
        return jsonify('error of saving image')

    return jsonify('complete saving image')


@app.route('/e404')
def e404():
    return render_template('404.html')


@app.route('/e503')
def e503():
    return render_template('503.html')


@app.errorhandler(404)
def page_not_found(e):
    print(e)
    return render_template('404.html'), 404


@app.errorhandler(Exception)
def server_error(e):
    print(e)
    return render_template('503.html'), 503