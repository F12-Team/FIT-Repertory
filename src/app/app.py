from flask import Flask, render_template, abort, send_from_directory, render_template, request
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import MetaData
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


init_login_manager(app)


app.register_blueprint(auth_bp)


@app.route('/')
def index():
    return render_template('index.html', directions={}, projects={})