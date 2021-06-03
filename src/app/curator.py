from flask import Blueprint, render_template, redirect, url_for, flash, request, jsonify
from flask_login import LoginManager, login_user, logout_user, login_required, current_user
from functools import wraps
from sqlalchemy import exc
from models import Direction, Group, Role, Status, Semester, Type, Student, User, Image, Info, Project
import secrets
import string
from transliterate import transliterate
from app import db

bp = Blueprint('curator', __name__, url_prefix='/curator')

curator_project_statuses = ['В разработке', 'Отправлено на рассмотрение куратором']

curator_project_statuses_for_gen_psswds = ['Отсутствует тимлид']

def gen_password():
    alphabet = string.ascii_letters + string.digits
    password = ''.join(secrets.choice(alphabet) for i in range(16))
    return password

def gen_login(teamlead_name):
    teamlead_name = teamlead_name.replace(" ", "")
    teamlead_name = transliterate(teamlead_name)
    teamlead_name = 'teamlead' + teamlead_name[1:9]

    alphabet = string.ascii_letters + string.digits
    name = teamlead_name + ''.join(secrets.choice(alphabet) for i in range(8))
    return name

@bp.route('/')
def index():
    #projects = Project.query.join(Status).filter(Project.curator_id == current_user.id).filter(Status.name in curator_project_statuses).all()
    projects = Project.query.join(Status).filter(Status.name in curator_project_statuses).all()

    return render_template('curator/projects.html', projects=projects)


@bp.route('/genpsswds', methods=['POST'])
def genpsswds():
    #projects = Project.query.join(Status).filter(Project.curator_id == current_user.id).filter(Status.name in curator_project_statuses).all()
    projects = Project.query.join(Status).filter(Status.name in curator_project_statuses_for_gen_psswds).all()

    creds = {}

    for project in projects:
        project_name = project.name
        login = gen_login(project_name)
        psswd = gen_password()
        creds.update({project.name: {login: psswd}})

        user = User(login=login, last_name=login, first_name=login)
        user.set_password(psswd)

        db.session.add(user)
        db.session.commit()

        added_user = User.query.filter(User.login == login).all

        project.teamlead_id = added_user.id

        db.session.add(project)
        db.session.commit()

    return jsonify(creds)