from flask import Blueprint, render_template, redirect, url_for, flash, request, jsonify
from flask_login import LoginManager, login_user, logout_user, login_required, current_user
from functools import wraps
from sqlalchemy import exc, desc
from models import Faculty, Direction, Group, Role, Status, Semester, Type, Student, User, Image, Info, Project
from app import db
from tools import ProjectsFilterForSearch
import json

bp = Blueprint('view', __name__, url_prefix='/view')


PER_PAGE = 1


def search_params():
    return {
        'name': request.form.get('name'),
        'direction_id': request.form.get('direction_id'),
        'semester_id': request.form.get('semester_id')
    }


def local_pagination(pagination):
    return {
        'page': pagination.page,
        'has_prev': pagination.has_prev,
        'has_next': pagination.has_next,
        'iter_pages': list(pagination.iter_pages()),
    }


@bp.route('/projects', methods=['POST', 'GET'])
def projects():
    direction_id = request.form.get('direction_id', 0, type=int)
    semesters = Semester.query.all()
    directions = Direction.query.all()
    projects = Project.query.order_by(desc(Project.likes))
    if direction_id == 0:
        projects = projects.limit(PER_PAGE).all()
    else:
        projects = projects.filter(Project.direction_id==direction_id).limit(PER_PAGE).all()

    return render_template('view/projects.html', semesters=semesters, directions=directions, projects={})


@bp.route('/search', methods=['POST'])
def search():
    page = request.form.get('page', 1, type=int)
    per_page = request.form.get('per_page', PER_PAGE, type=int)
    projects_filter = ProjectsFilterForSearch(**search_params())
    projects = projects_filter.perform()
    pagination = projects.paginate(page, per_page)
    projects = pagination.items

    newdata = []
    for entry in projects:
        newdata.append(entry.to_dict())

    return jsonify(local_pagination(pagination), per_page, search_params(), newdata)


@bp.route('/project/<project_id>')
def project(project_id):
    project = Project.query.filter(Project.id == project_id).first()
    print(project)

    return render_template('view/project.html', project=project)


@bp.route('/like', methods=['POST'])
def like():
    like = request.form.get('like')
    project_id = request.form.get('project_id')

    if like == 'True':
        project = Project.query.filter(Project.id == project_id).first()
        project.like()
        db.session.add(project)
        db.session.commit()
        return jsonify('complete like')
    else:
        project = Project.query.filter(Project.id == project_id).first()
        project.unlike()
        db.session.add(project)
        db.session.commit()
        return jsonify('complete dislike')
