from rest_framework import serializers
from .models import Event, EventRegistration
from users.models import User

class EventSerializer(serializers.ModelSerializer):
    class Meta:
        model =Event 
        fields = '__all__'
        read_only_fields = ['organizer']  # ✅ prevent "organizer is required" error
        extra_kwargs = {
            'banner_image': {'required': False, 'allow_null': True},
        }


    def create(self,validate_data):
        request = self.context.get('request')
        user = request.user if request else None
        if user and user.is_authenticated:
            return Event.objects.create(organizer=user, **validate_data)
        raise serializers.ValidationError("User not authenticated.")
    

class EventRegistrationSerializer(serializers.ModelSerializer):
    event = serializers.PrimaryKeyRelatedField(queryset=Event.objects.all())  # ✅ Fix here
    user = serializers.StringRelatedField(read_only=True)
    event_detail = EventSerializer(source='event', read_only=True)

    class Meta:
        model = EventRegistration
        fields = '__all__'

    def create(self, validated_data):
        request = self.context.get('request')
        user = request.user if request else None
        if user and user.is_authenticated:
            return EventRegistration.objects.create(user=user, **validated_data)
        raise serializers.ValidationError("User not authenticated.")