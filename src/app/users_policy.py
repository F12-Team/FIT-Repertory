from flask_login import current_user


def is_admin():
    print(current_user.role)
    return current_user.role.name == 'Администратор'


def is_curator():
    print(current_user.role)
    return current_user.role.name == 'Куратор'


def is_teamlead():
    print(current_user.role)
    return current_user.role.name == 'Тимлид'


def is_student():
    print(current_user.role)
    return current_user.role.name == 'Студент'


class UsersPolicy:
    def __init__(self, record=None):
        self.record = record

    def update(self):
        return is_admin() or is_curator()

    def addprojects(self):
        return is_admin()