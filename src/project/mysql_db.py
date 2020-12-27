import mysql.connector as connector
from flask import g


class MySQL:
    def __init__(self, app):
        self.app = app
        self.app.teardown_request(self.teardown_request)

    @property
    def connection(self):
        if 'db' not in g:
            g.db = self.connect()
        return g.db

    def connect(self):
        return connector.connect(**self.config)

    @property
    def config(self):
        return {
            'user': self.app.config['MYSQL_USER'],
            'password': self.app.config['MYSQL_PASSWORD'],
            'host': self.app.config['MYSQL_HOST'],
            'database': self.app.config['MYSQL_DATABASE']
        }

    def teardown_request(self, exception=None):
        db = g.pop('db', None)
        if db is not None:
            db.close()
