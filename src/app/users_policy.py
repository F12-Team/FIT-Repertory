from flask_login import current_user


def is_admin():
    print(current_user.role)
    return current_user.role.name == 'Администратор'


def is_curator():
    print(current_user.role)
    return current_user.role.name == 'Куратор'


def is_user():
    print(current_user.role)
    return current_user.role.name == 'Пользователь'


class UsersPolicy:
    def __init__(self, record=None):
        self.record = record

    def update(self):
        return is_admin() or is_curator()