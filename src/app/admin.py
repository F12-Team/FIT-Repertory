from flask import Blueprint, render_template, redirect, url_for, flash, request, jsonify
from models import Direction, Group, Project, Role, Semester, Status, User
from app import db
from tools import ImageSaver

bp = Blueprint('admin', __name__, url_prefix='/admin')

def addproject_params():
    return {
        'name': request.form.get('name'),
        'direction_id': request.form.get('direction_id'),
        'semester_id': request.form.get('semester_id'),
        'curator_id': request.form.get('curator_id')
    }

def adduser_params():
    return {
        'login': request.form.get('login'),
        'last_name': request.form.get('last_name'),
        'first_name': request.form.get('first_name'),
        'middle_name': request.form.get('middle_name', '', type=str),
        'role_id': request.form.get('role_id'),
    }

@bp.route('/projects')
def projects():
    projects = Project.query.all()
    semesters = Semester.query.all()
    directions = Direction.query.all()
    curators = User.query.join(Role).filter(Role.name == 'Куратор').all()
    teamleads = User.query.join(Role).filter(Role.name == 'Тимлид').all()
    return render_template('admin/projects.html', semesters=semesters, directions=directions, curators=curators, teamleads=teamleads, projects=projects)


@bp.route('/addproject', methods=['POST'])
def addproject():
    project = Project(**addproject_params(), status_id=4)
    db.session.add(project)
    db.session.commit()
    return jsonify('complete add')


@bp.route('/groups')
def groups():
    groups = Group.query.all()
    directions = Direction.query.all()

    return render_template('admin/groups.html', directions=directions, groups=groups)


@bp.route('/addgroup', methods=['POST'])
def addgroup():
    name = request.form.get('name')
    direction_id = request.form.get('direction_id')
    group = Group(name=name, direction_id=direction_id)
    db.session.add(group)
    db.session.commit()
    return jsonify('complete add')


@bp.route('/semesters')
def semesters():
    semesters = Semester.query.all()

    return render_template('admin/semesters.html', semesters=semesters)


@bp.route('/addsemester', methods=['POST'])
def addsemester():
    name = request.form.get('name')
    semester = Semester(name=name)
    db.session.add(semester)
    db.session.commit()
    return jsonify('complete add')


@bp.route('/users')
def users():
    users = User.query.all()
    roles = Role.query.all()

    return render_template('admin/users.html', users=users, roles=roles)


@bp.route('/adduser', methods=['POST'])
def adduser():
    user = User(**adduser_params())
    password = request.form.get('password')
    user.set_password(password)

    db.session.add(user)
    db.session.commit()

    return jsonify('complete add')

@bp.route('/updateproject/<project_id>', methods=['GET', 'POST'])
def updateproject(project_id):
    if request.method == 'GET':
        project = Project.query.filter(Project.id == project_id).first()
        teamleads = User.query.filter(User.role_id == 3).all()
        curators = User.query.filter(User.role_id == 2).all()
        directions = Direction.query.all()
        semesters = Semester.query.all()
        statuses = Status.query.all()

        return render_template('admin/updateproject.html', project=project, teamleads=teamleads, curators=curators, directions=directions, semesters=semesters, statuses=statuses)

    else:
        project = Project.query.filter(Project.id == project_id).first()

        # print(request.form.to_dict())

        # name = request.form.get('name')
        # short_description = request.form.get('short_description')
        # description = request.form.get('description')
        # status_id = request.form.get('status_id')
        # semester_id = request.form.get('semester_id')
        # direction_id = request.form.get('direction_id')
        # teamlead_id = request.form.get('teamlead_id')
        # curator_id = request.form.get('curator_id')
        # techs = request.form.get('techs')

        # print(name)
        # print(short_description)
        # print(description)
        # print(status_id)
        # print(semester_id)
        # print(direction_id)
        # print(teamlead_id)
        # print(curator_id)
        # print(techs)


        f = request.files['file']
        print(f)
        img = None
        if f and f.filename:
            img_saver = ImageSaver(file=f, type_id=6)
            img = img_saver.save()

        if img == None:
            flash(f'Нельзя добавить один постер к двум проектам!', 'danger')
            return redirect(url_for('admin.projects'))
        else:
            project.poster.append(img)
            db.session.add(project)
            db.session.commit()

        flash('Проект успешно обновлён!', 'success')
        return redirect(url_for('admin.projects'))