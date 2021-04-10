import json
from sqlalchemy.ext.declarative import DeclarativeMeta
from models import Faculty, Direction, Group, Role, Laboratory, Status, Semester, Type, Student, User, Image, Info, Project

def new_alchemy_encoder(revisit_self = False, fields_to_expand = []):
    _visited_objs = []

    class AlchemyEncoder(json.JSONEncoder):
        def default(self, obj):
            if isinstance(obj.__class__, DeclarativeMeta):
                # don't re-visit self
                if revisit_self:
                    if obj in _visited_objs:
                        return None
                    _visited_objs.append(obj)

                # go through each field in this SQLalchemy class
                fields = {}
                for field in [x for x in dir(obj) if not x.startswith('_') and x != 'metadata' and not x.startswith('query')]:
                    val = obj.__getattribute__(field)

                    # is this field another SQLalchemy object, or a list of SQLalchemy objects?
                    if isinstance(val.__class__, DeclarativeMeta) or (isinstance(val, list) and len(val) > 0 and isinstance(val[0].__class__, DeclarativeMeta)):
                        # unless we're expanding this field, stop here
                        if field not in fields_to_expand:
                            # not expanding this field: set it to None and continue
                            fields[field] = None
                            continue

                    fields[field] = val
                # a json-encodable dict
                return fields

            return json.JSONEncoder.default(self, obj)

    return AlchemyEncoder

class ProjectsFilter:
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