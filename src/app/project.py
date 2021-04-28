from flask import Blueprint, render_template, redirect, url_for, flash, request
from flask_login import LoginManager, login_user, logout_user, login_required, current_user
from functools import wraps
from sqlalchemy import exc
from models import Faculty, Direction, Group, Role, Status, Semester, Type, Student, User, Image, Info, Project

bp = Blueprint('project', __name__, url_prefix='/project')

@bp.route('/')
def index():
    return redirect(url_for('index'))