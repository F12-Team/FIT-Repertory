from flask import Blueprint, render_template, redirect, url_for, flash, request, jsonify
from flask_login import LoginManager, login_user, logout_user, login_required, current_user
from functools import wraps
from sqlalchemy import exc, desc
from models import Faculty, Direction, Group, Role, Laboratory, Status, Semester, Type, Student, User, Image, Info, Project
from app import db
from tools import new_alchemy_encoder
import json
from collections import ChainMap

bp = Blueprint('view', __name__, url_prefix='/view')


class ProjectsFilter:
    def __init__(self, name, direction_ids, semester_ids):
        self.name = name
        self.direction_ids = direction_ids
        self.semester_ids = semester_ids
        self.query = Project.query

    def perform(self):
        self.__filter_by_name()
        self.__filter_by_direction()
        self.__filter_by_semester()
        return self.query.order_by(Project.likes.desc())

    def __filter_by_name(self):
        if self.name:
            self.query = self.query.filter(
                Project.name.ilike('%' + self.name + '%'))

    def __filter_by_direction(self):
        if self.direction_ids:
            self.query = self.query.filter(
                Project.direction_ids.in_(self.direction_ids))

    def __filter_by_semester(self):
        if self.semester_ids:
            self.query = self.query.filter(
                Project.semester_ids.in_(self.semester_ids))


PER_PAGE = 5


def search_params():
    return {
        'name': request.form.get('name'),
        'direction_ids': request.form.getlist('direction_ids'),
        'semester_ids': request.form.getlist('semester_ids')
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
    direction_id = request.form.get('direction_id', 0, int)
    semesters = Semester.query.all()
    directions = Direction.query.all()
    projects = Project.query.order_by(desc(Project.likes))
    if direction_id == 0:
        projects = projects.limit(PER_PAGE).all()
    else:
        projects = projects.filter(Project.direction_id==direction_id).limit(PER_PAGE).all()

    return render_template('view/projects.html', semesters=semesters, directions=directions, projects=projects)


@bp.route('/search', methods=['POST'])
def search():
    page = request.form.get('page', 1, type=int)
    projects_filter = ProjectsFilter(**search_params())
    projects = projects_filter.perform()
    pagination = projects.paginate(page, PER_PAGE)
    projects = pagination.items

    newdata = {}
    for entry in projects:
        name = entry.to_dict().pop('id') #remove and return the name field to use as a key
        newdata[name] = entry.to_dict()

    return jsonify(local_pagination(pagination), search_params(), newdata)


@bp.route('/project/<project_id>')
def project(project_id):
    project = Project.query.filter(Project.id == project_id).all()

    return render_template('view/project.html', project=project)


@bp.route('/like', methods=['POST'])
def like():
    like = request.form.get('like')
    project_id = request.form.get('project_id')

    print(like)
    print(project_id)

    if like == 'True':
        project = Project.query.filter(Project.id == project_id).first()
        print('like')
        project.like()
        db.session.add(project)
        db.session.commit()
        return jsonify('complete like')
    else:
        project = Project.query.filter(Project.id == project_id).first()
        print('dislike')
        project.unlike()
        db.session.add(project)
        db.session.commit()
        return jsonify('complete dislike')
