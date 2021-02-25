"""Initial migration

Revision ID: a0623b7ee393
Revises: 
Create Date: 2021-02-23 19:16:24.328015

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'a0623b7ee393'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('faculties',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(length=128), nullable=False),
    sa.Column('description', sa.Text(), nullable=True),
    sa.PrimaryKeyConstraint('id', name=op.f('pk_faculties')),
    sa.UniqueConstraint('name', name=op.f('uq_faculties_name'))
    )
    op.create_table('images',
    sa.Column('id', sa.String(length=128), nullable=False),
    sa.Column('file_name', sa.String(length=128), nullable=False),
    sa.Column('mime_type', sa.String(length=128), nullable=False),
    sa.Column('md5_hash', sa.String(length=128), nullable=False),
    sa.Column('created_at', sa.DateTime(), server_default=sa.text('now()'), nullable=False),
    sa.Column('object_type', sa.String(length=128), nullable=True),
    sa.PrimaryKeyConstraint('id', name=op.f('pk_images')),
    sa.UniqueConstraint('md5_hash', name=op.f('uq_images_md5_hash'))
    )
    op.create_table('laboratories',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(length=128), nullable=False),
    sa.Column('description', sa.Text(), nullable=True),
    sa.PrimaryKeyConstraint('id', name=op.f('pk_laboratories')),
    sa.UniqueConstraint('name', name=op.f('uq_laboratories_name'))
    )
    op.create_table('roles',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(length=128), nullable=False),
    sa.Column('description', sa.Text(), nullable=True),
    sa.PrimaryKeyConstraint('id', name=op.f('pk_roles')),
    sa.UniqueConstraint('name', name=op.f('uq_roles_name'))
    )
    op.create_table('semesters',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(length=128), nullable=False),
    sa.Column('description', sa.Text(), nullable=True),
    sa.PrimaryKeyConstraint('id', name=op.f('pk_semesters')),
    sa.UniqueConstraint('name', name=op.f('uq_semesters_name'))
    )
    op.create_table('statuses',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(length=128), nullable=False),
    sa.Column('description', sa.Text(), nullable=True),
    sa.PrimaryKeyConstraint('id', name=op.f('pk_statuses')),
    sa.UniqueConstraint('name', name=op.f('uq_statuses_name'))
    )
    op.create_table('types',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(length=128), nullable=False),
    sa.Column('description', sa.Text(), nullable=True),
    sa.PrimaryKeyConstraint('id', name=op.f('pk_types')),
    sa.UniqueConstraint('name', name=op.f('uq_types_name'))
    )
    op.create_table('directions',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(length=128), nullable=False),
    sa.Column('description', sa.Text(), nullable=True),
    sa.Column('faculty_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['faculty_id'], ['faculties.id'], name=op.f('fk_directions_faculty_id_faculties')),
    sa.PrimaryKeyConstraint('id', name=op.f('pk_directions')),
    sa.UniqueConstraint('name', name=op.f('uq_directions_name'))
    )
    op.create_table('users',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('login', sa.String(length=128), nullable=False),
    sa.Column('last_name', sa.String(length=128), nullable=False),
    sa.Column('first_name', sa.String(length=100), nullable=False),
    sa.Column('middle_name', sa.String(length=100), nullable=True),
    sa.Column('password_hash', sa.String(length=100), nullable=False),
    sa.Column('created_at', sa.DateTime(), server_default=sa.text('now()'), nullable=False),
    sa.Column('role_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['role_id'], ['roles.id'], name=op.f('fk_users_role_id_roles')),
    sa.PrimaryKeyConstraint('id', name=op.f('pk_users')),
    sa.UniqueConstraint('login', name=op.f('uq_users_login'))
    )
    op.create_table('groups',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(length=128), nullable=False),
    sa.Column('description', sa.Text(), nullable=True),
    sa.Column('direction_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['direction_id'], ['directions.id'], name=op.f('fk_groups_direction_id_directions')),
    sa.PrimaryKeyConstraint('id', name=op.f('pk_groups')),
    sa.UniqueConstraint('name', name=op.f('uq_groups_name'))
    )
    op.create_table('projects',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('key', sa.String(length=128), nullable=False),
    sa.Column('name', sa.String(length=128), nullable=False),
    sa.Column('description', sa.String(length=128), nullable=True),
    sa.Column('likes', sa.Integer(), nullable=True),
    sa.Column('semester_id', sa.Integer(), nullable=False),
    sa.Column('direction_id', sa.Integer(), nullable=False),
    sa.Column('laboratory_id', sa.Integer(), nullable=False),
    sa.Column('status_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['direction_id'], ['directions.id'], name=op.f('fk_projects_direction_id_directions')),
    sa.ForeignKeyConstraint(['laboratory_id'], ['laboratories.id'], name=op.f('fk_projects_laboratory_id_laboratories')),
    sa.ForeignKeyConstraint(['semester_id'], ['semesters.id'], name=op.f('fk_projects_semester_id_semesters')),
    sa.ForeignKeyConstraint(['status_id'], ['statuses.id'], name=op.f('fk_projects_status_id_statuses')),
    sa.PrimaryKeyConstraint('id', name=op.f('pk_projects')),
    sa.UniqueConstraint('key', name=op.f('uq_projects_key'))
    )
    op.create_table('curators',
    sa.Column('curator_id', sa.Integer(), nullable=False),
    sa.Column('project_id', sa.Integer(), nullable=False),
    sa.Column('description', sa.Text(), nullable=True),
    sa.ForeignKeyConstraint(['curator_id'], ['users.id'], name=op.f('fk_curators_curator_id_users')),
    sa.ForeignKeyConstraint(['project_id'], ['projects.id'], name=op.f('fk_curators_project_id_projects')),
    sa.PrimaryKeyConstraint('curator_id', 'project_id', name=op.f('pk_curators'))
    )
    op.create_table('info',
    sa.Column('id', sa.String(length=128), nullable=False),
    sa.Column('name', sa.String(length=128), nullable=False),
    sa.Column('description', sa.String(length=128), nullable=True),
    sa.Column('resource', sa.String(length=128), nullable=True),
    sa.Column('project_id', sa.Integer(), nullable=False),
    sa.Column('type_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['project_id'], ['projects.id'], name=op.f('fk_info_project_id_projects')),
    sa.ForeignKeyConstraint(['type_id'], ['types.id'], name=op.f('fk_info_type_id_types')),
    sa.PrimaryKeyConstraint('id', 'project_id', 'type_id', name=op.f('pk_info'))
    )
    op.create_table('pictures',
    sa.Column('project_id', sa.Integer(), nullable=False),
    sa.Column('type_id', sa.Integer(), nullable=False),
    sa.Column('image_id', sa.String(length=128), nullable=False),
    sa.ForeignKeyConstraint(['image_id'], ['images.id'], name=op.f('fk_pictures_image_id_images')),
    sa.ForeignKeyConstraint(['project_id'], ['projects.id'], name=op.f('fk_pictures_project_id_projects')),
    sa.ForeignKeyConstraint(['type_id'], ['types.id'], name=op.f('fk_pictures_type_id_types')),
    sa.PrimaryKeyConstraint('project_id', 'type_id', 'image_id', name=op.f('pk_pictures'))
    )
    op.create_table('students',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('last_name', sa.String(length=100), nullable=False),
    sa.Column('first_name', sa.String(length=100), nullable=False),
    sa.Column('middle_name', sa.String(length=100), nullable=True),
    sa.Column('role_id', sa.Integer(), nullable=False),
    sa.Column('group_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['group_id'], ['groups.id'], name=op.f('fk_students_group_id_groups')),
    sa.ForeignKeyConstraint(['role_id'], ['roles.id'], name=op.f('fk_students_role_id_roles')),
    sa.PrimaryKeyConstraint('id', name=op.f('pk_students'))
    )
    op.create_table('teams',
    sa.Column('student_id', sa.Integer(), nullable=False),
    sa.Column('project_id', sa.Integer(), nullable=False),
    sa.Column('function', sa.Text(), nullable=True),
    sa.Column('description', sa.Text(), nullable=True),
    sa.ForeignKeyConstraint(['project_id'], ['projects.id'], name=op.f('fk_teams_project_id_projects')),
    sa.ForeignKeyConstraint(['student_id'], ['students.id'], name=op.f('fk_teams_student_id_students')),
    sa.PrimaryKeyConstraint('student_id', 'project_id', name=op.f('pk_teams'))
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('teams')
    op.drop_table('students')
    op.drop_table('pictures')
    op.drop_table('info')
    op.drop_table('curators')
    op.drop_table('projects')
    op.drop_table('groups')
    op.drop_table('users')
    op.drop_table('directions')
    op.drop_table('types')
    op.drop_table('statuses')
    op.drop_table('semesters')
    op.drop_table('roles')
    op.drop_table('laboratories')
    op.drop_table('images')
    op.drop_table('faculties')
    # ### end Alembic commands ###
