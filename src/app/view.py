from flask import Blueprint, jsonify, render_template, request
from sqlalchemy import desc
from models import Direction, Project, Semester
from app import db
from tools import ProjectsFilterForSearch

bp = Blueprint('view', __name__, url_prefix='/view')


PER_PAGE = 6


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
    directions = Direction.query.filter(Direction.name != 'Не указано').all()
    projects = Project.query.filter(Project.status_id == 2).order_by(desc(Project.likes))
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
    pagination = projects.filter(Project.status_id == 2).paginate(page, per_page)
    projects = pagination.items

    newdata = []
    for entry in projects:
        newdata.append(entry.to_dict())

    return jsonify(local_pagination(pagination), per_page, search_params(), newdata)


@bp.route('/project/<project_id>')
def project(project_id):
    project = Project.query.filter(Project.id == project_id).first()
    google_poster = None
    google_video = None
    for info in project.info:
        if info.type.name == 'Постер с GoogleDisk':
            google_poster = info.resource
        if info.type.name == 'Видео с GoogleDisk':
            google_video = info.resource

    return render_template('view/project.html', project=project, google_poster=google_poster, google_video=google_video)


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
