from django.contrib import admin
from .models import Event ,EventRegistration

admin.site.register(EventRegistration)
admin.site.register(Event)