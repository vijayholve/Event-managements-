from django.contrib import admin
from .models import Event ,EventRegistration ,Venue,City,Category

data =[Event, EventRegistration, Venue, City, Category]
for model in data:
    admin.site.register(model)
