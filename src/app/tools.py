from models import Direction, Group, Role, Status, Semester, Type, Student, User, Image, Info, Project
import os
from uuid import uuid4
from flask import current_app
import hashlib
from werkzeug.utils import secure_filename
from app import db

class ProjectsFilterForSearch:
    def __init__(self, name, direction_id, semester_id):
        self.name = name
        self.direction_id = direction_id
        self.semester_id = semester_id
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
        if self.direction_id:
            self.query = self.query.filter(
                Project.direction_id == self.direction_id)

    def __filter_by_semester(self):
        if self.semester_id:
            self.query = self.query.filter(
                Project.semester_id == self.semester_id)


class ImageSaver:
    def __init__(self, file, type_id):
        self.file = file
        self.type_id = type_id

    def save(self):
        print('saving')
        self.img = self.__find_by_md5_hash()
        if self.img is not None:
            return None
        file_name = secure_filename(self.file.filename)
        self.img = Image(
            id=str(uuid4()),
            file_name=file_name,
            mime_type=self.file.mimetype,
            md5_hash=self.md5_hash,
            type_id=self.type_id
        )
        self.file.save(os.path.join(
            current_app.config['UPLOAD_FOLDER'], self.img.storage_filename))
        db.session.add(self.img)
        db.session.commit()
        return self.img

    def bind_to_object(self, obj):
        self.img.object_type = obj.__tablename__
        self.img.object_id = obj.id
        self.img.active = True
        db.session.add(self.img)
        db.session.commit()

    def __find_by_md5_hash(self):
        self.md5_hash = hashlib.md5(self.file.read()).hexdigest()
        self.file.seek(0)
        print(Image.query.filter(Image.md5_hash == self.md5_hash).first())
        return Image.query.filter(Image.md5_hash == self.md5_hash).first()