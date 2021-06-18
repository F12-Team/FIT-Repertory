from flask import Blueprint, redirect, url_for

bp = Blueprint('project', __name__, url_prefix='/project')

@bp.route('/')
def index():
    return redirect(url_for('index'))