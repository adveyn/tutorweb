"""
WSGI config for ICS4U project.

It exposes the WSGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/4.1/howto/deployment/wsgi/
"""
'''
Author: Advey Nandan
Last Modified: June 2, 2023
DJANGO VERSION 4.1.5

WSGI routing
'''
import os

from django.core.wsgi import get_wsgi_application

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'ICS4U.settings')

application = get_wsgi_application()
