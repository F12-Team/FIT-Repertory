import os
from flask import url_for
import sqlalchemy as sa
from flask_login import UserMixin
from werkzeug.security import generate_password_hash, check_password_hash
import markdown
from app import db
from sqlalchemy.dialects import mysql
from sqlalchemy import exc
from sqlalchemy_serializer import SerializerMixin
from users_policy import UsersPolicy


pictures = db.Table('pictures',
                    db.Column('project_id', db.Integer, db.ForeignKey('projects.id'), primary_key=True),
                    db.Column('type_id', db.Integer, db.ForeignKey('types.id'), primary_key=True),
                    db.Column('image_id', db.String(128), db.ForeignKey('images.id'), primary_key=True))


teams = db.Table('teams',
                    db.Column('student_id', db.Integer, db.ForeignKey('students.id'), primary_key=True),
                    db.Column('project_id', db.Integer, db.ForeignKey('projects.id'), primary_key=True),
                    db.Column('function', db.Text()),
                    db.Column('description', db.Text()))


techs = db.Table('techs',
                    db.Column('technology_id', db.Integer, db.ForeignKey('technologies.id'), primary_key=True),
                    db.Column('project_id', db.Integer, db.ForeignKey('projects.id'), primary_key=True))



class Direction(db.Model, SerializerMixin):
    __tablename__ = 'directions'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(128), nullable=False, unique=True)
    description = db.Column(db.Text())

    image_id = db.Column(db.String(128), db.ForeignKey('images.id'))

    image = db.relationship('Image')

    def __repr__(self):
        return '<Direction %r>' % self.name


class Group(db.Model, SerializerMixin):
    __tablename__ = 'groups'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(128), nullable=False, unique=True)
    description = db.Column(db.Text())

    direction_id = db.Column(db.Integer, db.ForeignKey('directions.id'), nullable=False)
    direction = db.relationship('Direction')

    def __repr__(self):
        return '<Group %r>' % self.name


class Role(db.Model, SerializerMixin):
    __tablename__ = 'roles'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(128), nullable=False, unique=True)
    description = db.Column(db.Text())

    def __repr__(self):
        return '<Role %r>' % self.name


class Status(db.Model, SerializerMixin):
    __tablename__ = 'statuses'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(128), nullable=False, unique=True)
    description = db.Column(db.Text())

    def __repr__(self):
        return '<Status %r>' % self.name


class Semester(db.Model, SerializerMixin):
    __tablename__ = 'semesters'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(128), nullable=False, unique=True)
    description = db.Column(db.Text())

    def __repr__(self):
        return '<Semester %r>' % self.name


class Type(db.Model, SerializerMixin):
    __tablename__ = 'types'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(128), nullable=False, unique=True)
    description = db.Column(db.Text())

    def __repr__(self):
        return '<Type %r>' % self.name


class Student(db.Model, SerializerMixin):
    __tablename__ = 'students'

    id = db.Column(db.Integer, primary_key=True)
    last_name = db.Column(db.String(128), nullable=False)
    first_name = db.Column(db.String(128), nullable=False)
    middle_name = db.Column(db.String(128))

    role_id = db.Column(db.Integer, db.ForeignKey('roles.id'), nullable=False)
    group_id = db.Column(db.Integer, db.ForeignKey('groups.id'), nullable=False)

    def __repr__(self):
        return '<Student %r>' % self.full_name

    @property
    def full_name(self):
        return ' '.join([self.last_name, self.first_name, self.middle_name or ''])


class User(db.Model, UserMixin, SerializerMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    login = db.Column(db.String(128), nullable=False, unique=True)
    last_name = db.Column(db.String(128), nullable=False)
    first_name = db.Column(db.String(128), nullable=False)
    middle_name = db.Column(db.String(128))
    password_hash = db.Column(db.String(128), nullable=False)
    created_at = db.Column(db.DateTime, nullable=False, server_default=sa.sql.func.now())

    role_id = db.Column(db.Integer, db.ForeignKey('roles.id'), nullable=False)

    role = db.relationship('Role')

    serialize_rules = ('-password_hash',)

    def __repr__(self):
        return '<User %r>' % self.login

    @property
    def full_name(self):
        return ' '.join([self.last_name, self.first_name, self.middle_name or ''])

    def set_password(self, password):
        self.password_hash = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password_hash, password)

    def can(self, action, record=None):
        policy = UsersPolicy(record=record)
        method = getattr(policy, action, None)
        if method:
            return method()
        return False


class Image(db.Model, SerializerMixin):
    __tablename__ = 'images'

    id = db.Column(db.String(128), primary_key=True)
    file_name = db.Column(db.String(128), nullable=False)
    mime_type = db.Column(db.String(128), nullable=False)
    md5_hash = db.Column(db.String(128), nullable=False, unique=True)
    created_at = db.Column(db.DateTime, nullable=False, server_default=sa.sql.func.now())

    type_id = db.Column(db.Integer, db.ForeignKey('types.id'))

    def __repr__(self):
        return '<Image %r>' % self.file_name

    @property
    def url(self):
        return url_for('image', image_id=self.id)

    @property
    def storage_filename(self):
        _, ext = os.path.splitext(self.file_name)
        return self.id + ext

class Info(db.Model, SerializerMixin):
    __tablename__ = 'info'

    id = db.Column(db.String(128), primary_key=True)
    name = db.Column(db.String(128), nullable=False)
    description = db.Column(db.Text())
    resource = db.Column(db.String(128))

    project_id = db.Column(db.Integer, db.ForeignKey('projects.id'), primary_key=True)
    type_id = db.Column(db.Integer, db.ForeignKey('types.id'), primary_key=True)


class Project(db.Model, SerializerMixin):
    __tablename__ = 'projects'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(128), nullable=False)
    short_description = db.Column(db.Text())
    description = db.Column(db.Text())
    likes = db.Column(db.Integer, default=0)

    semester_id = db.Column(db.Integer, db.ForeignKey('semesters.id'), nullable=False)
    direction_id = db.Column(db.Integer, db.ForeignKey('directions.id'), nullable=False)
    status_id = db.Column(db.Integer, db.ForeignKey('statuses.id'), nullable=False)
    teamlead_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    curator_id = db.Column(db.Integer, db.ForeignKey('users.id'))

    curator = db.relationship('User', foreign_keys=[curator_id])
    teamlead = db.relationship('User', foreign_keys=[teamlead_id])
    direction = db.relationship('Direction')
    status = db.relationship('Status')
    semester = db.relationship('Semester')

    def __repr__(self):
        return '<Project %r>' % self.name

    def like(self):
        self.likes = self.likes + 1

    def unlike(self):
        self.likes = self.likes - 1


class Technology(db.Model, SerializerMixin):
    __tablename__ = 'technologies'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(128), primary_key=True)