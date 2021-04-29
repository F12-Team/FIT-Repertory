from flask import Blueprint, render_template, redirect, url_for, flash, request, jsonify
from flask_login import LoginManager, login_user, logout_user, login_required, current_user
from functools import wraps
from sqlalchemy import exc
from models import Direction, Group, Role, Status, Semester, Type, Student, User, Image, Info, Project
from auth import check_rights
import bleach
from app import db

bp = Blueprint('admin', __name__, url_prefix='/admin')

def addproject_params():
    return {
        'name': request.form.get('name'),
        'direction_id': request.form.get('direction_id'),
        'semester_id': request.form.get('semester_id'),
        'laboratory_id': request.form.get('laboratory_id'),
        'description': bleach.clean(request.form.get('description'))
    }

@bp.route('/addprojects')
#@login_required
#@check_rights('addprojects')
def addprojects():
    semesters = Semester.query.all()
    directions = Direction.query.all()
    curators = User.query.join(Role).filter(Role.name == 'Куратор').all()
    teamleads = User.query.join(Role).filter(Role.name == 'Тимлид').all()
    return render_template('admin/addprojects.html', semesters=semesters, directions=directions, curators=curators, teamleads=teamleads)


@bp.route('/addproject', methods=['POST'])
#@login_required
#@check_rights('addprojects')
def addproject():
    project = Project(**addproject_params(), status_id=1)
    db.session.add(project)
    curators_ids = request.form.getlist('curators_ids')
    for curator_id in curators_ids:
        add_curator = User.query.filter(User.id == curator_id).first()
        project.curators.append(add_curator)
    db.session.commit()
    return jsonify('complete add')


@bp.route('/groups')
#@login_required
#@check_rights('addprojects')
def groups():
    groups = Group.query.all()
    directions = Direction.query.all()

    return render_template('admin/groups.html', directions=directions, groups=groups)


@bp.route('/addgroup', methods=['POST'])
#@login_required
#@check_rights('addprojects')
def addgroup():
    name = request.form.get('name')
    direction_id = request.form.get('direction_id')
    group = Group(name=name, direction_id=direction_id)
    db.session.add(group)
    db.session.commit()
    return jsonify('complete add')


@bp.route('/semesters')
#@login_required
#@check_rights('addprojects')
def semesters():
    semesters = Semester.query.all()

    return render_template('admin/addprojects.html', semesters=semesters)


@bp.route('/addsemester', methods=['POST'])
#@login_required
#@check_rights('addprojects')
def addsemester():
    name = request.form.get('name')
    semester = Semester(name=name)
    db.session.add(semester)
    db.session.commit()
    return jsonify('complete add')


@bp.route('/users')
#@login_required
#@check_rights('addprojects')
def users():
    users = User.query.all()

    return render_template('admin/addprojects.html', users=users)


@bp.route('/adduser', methods=['POST'])
#@login_required
#@check_rights('addprojects')
def adduser():

    return jsonify('complete add')