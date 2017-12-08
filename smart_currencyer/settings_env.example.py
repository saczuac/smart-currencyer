import os
import datetime
#  Set your private settings here

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

SECRET_KEY = 'super-secret-key-here'

DEBUG = True

ALLOWED_HOSTS = ['']

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': os.path.join(BASE_DIR, 'db.sqlite3'),
    }
}

JWT_EXPIRATION_DELTA = datetime.timedelta(seconds=1800)
