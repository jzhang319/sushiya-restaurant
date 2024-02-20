import os


class Config:
    SECRET_KEY = os.environ.get('SECRET_KEY')
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    DATABASE_URL = os.environ.get('DATABASE_URL')
    if DATABASE_URL is not None:
        SQLALCHEMY_DATABASE_URI = DATABASE_URL.replace('postgres://', 'postgresql://')
    else:
        SQLALCHEMY_DATABASE_URI = None
    SQLALCHEMY_ECHO = True
