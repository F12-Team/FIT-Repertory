from flask_login import current_user


def is_admin():
    print(current_user.role)
    return current_user.role.name == 'Админ'


def is_curator():
    print(current_user.role)
    return current_user.role.name == 'Куратор'


def is_teamlead():
    print(current_user.role)
    return current_user.role.name == 'Тимлид'


def is_member():
    print(current_user.role)
    return current_user.role.name == 'Участник'


class UsersPolicy:
    def __init__(self, record=None):
        self.record = record

    def admin(self):
        return is_admin()

    def curator(self):
        return is_curator()

    def teamlead(self):
        return is_teamlead()

    def member(self):
        return is_member()