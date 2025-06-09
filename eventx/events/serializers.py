from rest_framework import serializers
from .models import Event, EventRegistration ,City,Category ,Venue
from users.models import User


class CitySerailizer(serializers.ModelSerializer):

    class  Meta:
        model= City
        fields= ['name','id']       
    def create(self, validated_data):  # ✅ 'validated_data' not 'validate_data'
        return City.objects.create(**validated_data) 
class CategorySerailizer(serializers.ModelSerializer):
     class Meta:
        model =Category
        fields= ['name','id']   

class VenueSerailizer(serializers.ModelSerializer):
    city_id = serializers.IntegerField(write_only=True)

    class Meta:
        model=Venue
        fields= ['id','name','city_id']
        
    def update(self, instance, validated_data):
        city_id = validated_data.pop('city_id', None)
        if city_id is not None:
            instance.city_id = city_id  # set FK directly
        return super().update(instance, validated_data)
class EventSerializer(serializers.ModelSerializer):
    category = CategorySerailizer(read_only=True)
    city = CitySerailizer(read_only=True)
    venue = VenueSerailizer(read_only=True)

    # To support write operations (POST/PUT), allow ID input
    category_id = serializers.PrimaryKeyRelatedField(
        queryset=Category.objects.all(), source='category', write_only=True, required=False
    )
    city_id = serializers.PrimaryKeyRelatedField(
        queryset=City.objects.all(), source='city', write_only=True, required=False
    )
    venue_id = serializers.PrimaryKeyRelatedField(
        queryset=Venue.objects.all(), source='venue', write_only=True, required=False
    )

    class Meta:
        model =Event 
        fields = '__all__'
        read_only_fields = ['organizer']  # ✅ prevent "organizer is required" error
        extra_kwargs = {
            'banner_image': {'required': False, 'allow_null': True},
        }


    def create(self, validated_data):  # ✅ 'validated_data' not 'validate_data'
        request = self.context.get('request')
        
        user = request.user if request else None
        if user and user.is_authenticated:
            event = Event.objects.create(organizer=user, **validated_data)
            print("Event created with ID:", event.id)
            return event
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