from flask_login import current_user


def is_admin():
    print(current_user.role)
    return current_user.role.name == 'Администратор'


def is_moderator():
    print(current_user.role)
    return current_user.role.name == 'Модератор'


def is_user():
    print(current_user.role)
    return current_user.role.name == 'Пользователь'


class UsersPolicy:
    def __init__(self, record=None):
        self.record = record

    def update_movie(self):
        return is_admin() or is_moderator()

    def create_movie(self):
        return is_admin()

    def delete_movie(self):
        return is_admin()

    def moderate_reviews(self):
        return is_moderator()
