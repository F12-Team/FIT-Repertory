from models import Faculty, Direction, Group, Role, Laboratory, Status, Semester, Type, Student, User, Image, Info, Project

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