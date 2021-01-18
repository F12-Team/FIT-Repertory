from flask import Flask, render_template, request, url_for, make_response, session, redirect, flash
from flask_login import login_required, current_user
from mysql_db import MySQL
import mysql.connector as connector
import math

PER_PAGE = 5

app = Flask(__name__)
application = app

app.config.from_pyfile('config.py')

mysql = MySQL(app)


@app.route('/')
def index():
    cursor = mysql.connection.cursor(named_tuple=True)

    query = '''
        SELECT * 
        FROM Directions 
        ORDER BY order_of_direction;
    '''

    cursor.execute(query)
    directions = cursor.fetchall()

    cursor.close()

    projects = []

    return render_template('index.html', directions=directions, projects=projects, direction_id=0)


@app.route('/direction/<int:direction_id>')
def direction(direction_id):
    cursor = mysql.connection.cursor(named_tuple=True)

    query = '''
        SELECT * 
        FROM Directions 
        ORDER BY order_of_direction;
    '''

    cursor.execute(query)
    directions = cursor.fetchall()

    query = '''
        SELECT id, name 
        FROM Projects 
        WHERE id_of_direction = %s 
        ORDER BY likes DESC 
        LIMIT 9;
    '''

    cursor.execute(query, (direction_id,))
    projects = cursor.fetchall()

    query = '''
        SELECT s.autumn_or_spring
        FROM Projects AS p 
        JOIN Semesters AS s ON p.id_of_semestr=s.id 
        JOIN Curators AS c ON c.id = p.id_of_curator 
        JOIN Directions AS d ON d.id = p.id_of_direction
        WHERE p.id = %s;
    '''

    cursor.execute(query, (direction_id,))
    semestrs = cursor.fetchone()
    
    cursor.close()

    return render_template('index.html', directions=directions, projects=projects, semestrs=semestrs, direction_id=direction_id)


@app.route('/project/<int:project_id>')
def project(project_id):
    cursor = mysql.connection.cursor(named_tuple=True)

    query = '''
        SELECT p.name as name_of_project, p.description as description_of_project, p.poster, p.video, p.likes, p.git, p.site, 
        s.year, s.autumn_or_spring,
        c.last_name, c.first_name, c.middle_name, c.description as description_of_curator,
        d.name as name_of_direction, d.description as description_of_direction
        FROM Projects AS p 
        JOIN Semesters AS s ON p.id_of_semestr=s.id 
        JOIN Curators AS c ON c.id = p.id_of_curator 
        JOIN Directions AS d ON d.id = p.id_of_direction
        WHERE p.id = %s;
    '''

    cursor.execute(query, (project_id,))
    projects = cursor.fetchone()

    query = '''
        SELECT t.role, s.last_name, s.first_name, s.middle_name, 
        g.name AS name_of_group 
        FROM Teams AS t 
        JOIN Students AS s ON t.id_of_student = s.id 
        JOIN `Groups` AS g ON s.id_of_group = g.id 
        WHERE id_of_project = %s 
        ORDER BY last_name;
    '''

    cursor.execute(query, (project_id,))
    teams = cursor.fetchall()

    cursor.close()

    return render_template('project.html', projects=projects, teams=teams)


@app.route('/direction/<int:direction_id>/all')
def all_projects(direction_id):
    cursor = mysql.connection.cursor(named_tuple=True)

    query = '''
        SELECT id, name 
        FROM Projects 
        WHERE id_of_direction = %s 
        ORDER BY likes DESC;
    '''

    cursor.execute(query, (direction_id,))
    projects = cursor.fetchall()
    
    cursor.close()

    return render_template('projects.html', projects=projects)


@app.route('/projects')
def projects():
    cursor = mysql.connection.cursor(named_tuple=True)

    page = request.args.get('page', 1, type=int)

    query = '''
        SELECT count(*) AS count 
        FROM Projects;
    '''

    cursor.execute(query)
    total_count = cursor.fetchone().count

    total_pages = math.ceil(total_count/PER_PAGE)

    pagination_info = {
        'current_page': page,
        'total_pages': total_pages,
        'per_page': PER_PAGE
    }

    query = '''
        SELECT id, name 
        FROM Projects 
        ORDER BY likes DESC
        LIMIT %s OFFSET %s;
    '''

    cursor.execute(query, (PER_PAGE, PER_PAGE*(page-1)))
    projects = cursor.fetchall()

    cursor.close()

    return render_template('projects.html', projects=projects, pagination_info=pagination_info)

