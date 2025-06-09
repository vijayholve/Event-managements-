from rest_framework import generics
from django.contrib.auth.models import User
from rest_framework.permissions import AllowAny
from rest_framework.serializers import ModelSerializer
from rest_framework.response import Response

class RegisterSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'email', 'password']
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data.get('email', ''),
            password=validated_data['password']
        )
        return user
from rest_framework import serializers
from .models import Comment, Rating
from users.serializers import UserSerializer 
from events.serializers import EventSerializer 
class CommentReplySerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)

    class Meta:
        model = Comment
        fields = ['id', 'user', 'content', 'created_at']
        read_only_fields = ['user', 'created_at']
class CommentSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    event = EventSerializer(read_only=True)
    replies = serializers.SerializerMethodField()
    user_rated = serializers.SerializerMethodField()

    class Meta:
        model = Comment
        fields = ['id', 'user', 'event', 'content', 'parent', 'created_at','replies','user_rated']  # <- Added 'replies'
        read_only_fields = ['user', 'event', 'created_at']
    def get_replies(self, obj):
        if obj.children and obj.children.exists():
            return CommentSerializer(obj.children.all(), many=True).data
        return []
    def create(self, validated_data):
        request = self.context['request']
        event = self.context['event']
        return Comment.objects.create(
            user=request.user,
            event=event,
            **validated_data
        )
    def get_user_rated(self, obj):
        if obj.parent:
            return None 
        rating = Rating.objects.filter(user=obj.user, event=obj.event).first()
        return rating.rating if rating else None
    
class RatingSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    event = EventSerializer(read_only=True)
    
    class Meta:
        model = Rating
        fields = ['id', 'user', 'event', 'content', 'parent', 'created_at']  # <- Added 'replies'
        read_only_fields = ['user', 'event', 'created_at']

    
       

class CommentWithRatingSerializer(serializers.Serializer):
    content = serializers.CharField()
    rating = serializers.IntegerField(min_value=1, max_value=5)
    parent = serializers.IntegerField(required=False)

    def validate_parent(self, value):
        if not Comment.objects.filter(id=value).exists():
            raise serializers.ValidationError("Parent comment does not exist.")
        return value

    def create(self, validated_data):
        user = self.context['request'].user
        event = self.context['event']

        # Save rating (update if already exists)
        Rating.objects.update_or_create(
            user=user,
            event=event,
            defaults={'rating': validated_data['rating']}
        )

        # Save comment
        parent = None
        if 'parent' in validated_data:
            parent = Comment.objects.get(id=validated_data['parent'])

        comment = Comment.objects.create(
            user=user,
            event=event,
            content=validated_data['content'],
            parent=parent
        )
        return comment
