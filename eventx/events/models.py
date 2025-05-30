from django.db import models
from users.models import User

class Category(models.Model):
    name = models.CharField(max_length=100, unique=True)

    def __str__(self):
        return self.name


# City Model
class City(models.Model):
    name = models.CharField(max_length=100, unique=True)

    def __str__(self):
        return self.name


# Venue Model (linked to a City)
class Venue(models.Model):
    name = models.CharField(max_length=255)
    address = models.TextField(blank=True)
    city = models.ForeignKey(City, on_delete=models.CASCADE, related_name='venues')

    def __str__(self):
        return f"{self.name}, {self.city.name}"
# Event Model
class Event(models.Model):
    organizer = models.ForeignKey(User, on_delete=models.CASCADE)
    title = models.CharField(max_length=255)
    description = models.TextField()
    category = models.ForeignKey('Category', on_delete=models.SET_NULL, null=True, blank=True)
    city = models.ForeignKey('City', on_delete=models.SET_NULL, null=True, blank=True)
    venue = models.ForeignKey('Venue', on_delete=models.SET_NULL, null=True, blank=True)
    start_time = models.DateTimeField()
    end_time = models.DateTimeField()
    is_public = models.BooleanField(default=True)
    banner_image = models.ImageField(upload_to='event_banners/', blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    is_blocked = models.BooleanField(default=False)
    def __str__(self):
        return f"{self.title} by {self.organizer.username}"
    def blocked(self):
        self.is_blocked = True
        self.save()

class EventRegistration(models.Model):
    event = models.ForeignKey(Event, on_delete=models.CASCADE,related_name='registrations') 
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    registered_at = models.DateTimeField(auto_now_add=True)
    is_checked_in = models.BooleanField(default=False)
    is_blocked = models.BooleanField(default=False)  # Blocked registration

    def __str__(self):
        return f"{self.user.username} - {self.event.title}"
