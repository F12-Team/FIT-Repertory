from flask import Blueprint, render_template, redirect, url_for, flash, request
from flask_login import LoginManager, login_user, logout_user, login_required, current_user
from functools import wraps
from sqlalchemy import exc
from models import Faculty, Direction, Group, Role, Laboratory, Status, Semester, Type, Student, User, Image, Info, Project

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
            self.query = self.query.filter(Project.name.ilike('%' + self.name + '%'))
    
    def __filter_by_direction(self):
        if self.direction_ids:
            self.query = self.query.filter(Project.direction_ids.in_(self.direction_ids))
    
    def __filter_by_semester(self):
        if self.semester_ids:
            self.query = self.query.filter(Project.semester_ids.in_(self.semester_ids))

PER_PAGE = 5

def search_params():
    return {
        'name': request.args.get('name'),
        'direction_ids': request.args.getlist('direction_ids'),
        'semester_ids': request.args.getlist('semester_ids')
    }

@bp.route('/projects')
def projects():
    semesters = Semester.query.all()
    directions = Direction.query.all()

    return render_template('view/projects.html', semesters=semesters, directions=directions)


@bp.route('/search', methods=['POST'])
def search():
    page = request.args.get('page', 1, type=int)
    projects_filter = ProjectsFilter(**search_params())
    projects = projects_filter.perform()
    pagination = projects.paginate(page, PER_PAGE)
    projects = pagination.items

    return jsonify(projects=projects, pagination=pagination, search_params=search_params())