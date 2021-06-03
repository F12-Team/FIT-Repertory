from flask import Blueprint, render_template, redirect, url_for, flash, request, jsonify
from flask_login import LoginManager, login_user, logout_user, login_required, current_user
from functools import wraps
from sqlalchemy import exc
from models import Direction, Group, Role, Status, Semester, Type, Student, User, Image, Info, Project
from app import db

bp = Blueprint('teamlead', __name__, url_prefix='/teamlead')

@bp.route('/')
def index():
    if current_user:
        project = Project.query.filter(Project.teamlead_id == current_user.id).first()
    else:
        project = Project.query.first()

    return render_template('teamlead/project.html', project=project)


@bp.route('/toconfirmation', methods=['POST'])
def to_confirmation():
    project_id = request.form.get('project_id')
    project = Project.query.filter(Project.id == project_id).first()
    project.status_id = 3

    db.session.add(project)
    db.session.commit()

    return jsonify('complete add')