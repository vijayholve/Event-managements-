from rest_framework import serializers
from .models import Event, EventRegistration

class EventSerializer(serializers.ModelSerializer):
    class Meta:
        model = Event
        fields = '__all__'

class EventRegistrationSerializer(serializers.ModelSerializer):
    event = EventSerializer()  # Optionally, include the event details in registration
    user = serializers.StringRelatedField()  # or use a User serializer

    class Meta:
        model = EventRegistration
        fields = '__all__'
