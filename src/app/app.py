from flask import Flask, render_template, abort, send_from_directory, render_template, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import MetaData, desc
from flask_migrate import Migrate
from sqlalchemy import exc

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


from models import Faculty, Direction, Group, Role, Laboratory, Status, Semester, Type, Student, User, Image, Info, Project


from auth import bp as auth_bp, init_login_manager
from admin import bp as admin_bp
from curator import bp as curator_bp
from project import bp as project_bp
from view import bp as view_bp

init_login_manager(app)

app.register_blueprint(auth_bp)
app.register_blueprint(admin_bp)
app.register_blueprint(curator_bp)
app.register_blueprint(project_bp)
app.register_blueprint(view_bp)

import json

@app.route('/')
def index():
    directions = Direction.query.all()
    return render_template('index.html', directions=directions, projects={})

@app.route('/direction', methods=['POST'])
def get_projects_by_direction_id():
    direction_id = request.form.get('direction_id', 0, type=int)
    projects = Project.query.filter(Project.direction_id == direction_id).order_by(desc(Project.likes)).limit(9).all()
    newdata = {}
    for entry in projects:
        name = entry.to_dict().pop('id')
        newdata[name] = entry.to_dict()

    return jsonify(newdata)


@app.route('/images/<image_id>')
def image(image_id):
    img = Image.query.get(image_id)
    if img is None:
        abort(404)
    return send_from_directory(app.config['UPLOAD_FOLDER'], img.storage_filename)