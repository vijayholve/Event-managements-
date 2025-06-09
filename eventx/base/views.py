from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, permissions
from .serializers import CommentWithRatingSerializer ,CommentSerializer ,RatingSerializer

from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import TokenAuthentication, SessionAuthentication,BasicAuthentication
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework import generics
from users.models import User
from rest_framework.permissions import AllowAny
from rest_framework.serializers import ModelSerializer
from rest_framework.response import Response
from .serializers import RegisterSerializer
from .models import Rating
from django.db.models import Avg 
from events.models import Event ,EventRegistration
class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    permission_classes = [AllowAny]
    serializer_class = RegisterSerializer
class DashboardUserView(generics.RetrieveAPIView):
    queryset = User.objects.all()
    permission_classes = [AllowAny]
    serializer_class = ModelSerializer

    def get(self, request, *args, **kwargs):
        users = User.objects.filter(is_active=True)
        total_users = users.count()
        superusers_count = users.filter(is_superuser=True).count()
        vendor_count = users.filter(role='vendor').count()
        organizer_count = users.filter(role='organizer').count()
        attendee_count = users.filter(role='attendee').count()

        data = {
            'total_users': total_users,
            'superusers_count': superusers_count,
            'vendor_count': vendor_count,
            'organizer_count': organizer_count,
            'attendee_count': attendee_count,
        }
        return Response(data)
class DashboardEventView(generics.RetrieveAPIView):
    queryset = Event.objects.all()
    permission_classes = [AllowAny]
    serializer_class = ModelSerializer

    def get(self, request, *args, **kwargs):
        events = Event.objects.filter(is_blocked=False)
        total_events = events.count()
        public_events_count = events.filter(is_public=True).count()
        blocked_events = Event.objects.filter(is_blocked=True).count()
        total_eventsregister = EventRegistration.objects.filter(is_blocked=False).count()
        blocked_eventregisters = EventRegistration.objects.filter(is_blocked=True).count()

        data = {
            'total_events': total_events,
            'public_events_count': public_events_count,
            'blocked_events': blocked_events,
            'total_eventsregister': total_eventsregister,
            'blocked_eventregisters': blocked_eventregisters,
        }
        return Response(data)
    
class CommentWithRatingAPIView(APIView):
    authentication_classes = [JWTAuthentication, SessionAuthentication, BasicAuthentication]
    permission_classes = [IsAuthenticated]
    def post(self, request, event_id):
        try:
            event = Event.objects.get(id=event_id)
        except Event.DoesNotExist:
            return Response({'error': 'Event not found'}, status=status.HTTP_404_NOT_FOUND)

        serializer = CommentWithRatingSerializer(data=request.data, context={'request': request, 'event': event})
        if serializer.is_valid():
            serializer.save()
            return Response({'message': 'Comment and rating submitted successfully'}, status=status.HTTP_201_CREATED)
        print(serializer.errors)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class CommentAPIView(APIView):
    authentication_classes = [JWTAuthentication, SessionAuthentication, BasicAuthentication]
    permission_classes = [AllowAny]
    def post(self, request, event_id):
        try:
            event = Event.objects.get(id=event_id)
        except Event.DoesNotExist:
            return Response({'error': 'Event not found'}, status=status.HTTP_404_NOT_FOUND)

        serializer = CommentSerializer(data=request.data, context={'request': request, 'event': event})
        if serializer.is_valid():
            serializer.save()
            return Response({'message': 'Comment created successfully'}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def get(self, request, event_id):
        try:
            event = Event.objects.get(id=event_id)
        except Event.DoesNotExist:
            return Response({'error': 'Event not found'}, status=status.HTTP_404_NOT_FOUND)

        comments = event.comments.filter(parent__isnull=True).order_by('-created_at')
        serializer = CommentSerializer(comments, many=True)

        avg_rating = Rating.objects.filter(event=event).aggregate(avg=Avg('rating'))['avg'] or 0.0

        return Response({
            'rating': round(avg_rating, 1),
            'data': serializer.data
        }, status=status.HTTP_200_OK)
class RatingAPIView(APIView):
    authentication_classes = [JWTAuthentication, SessionAuthentication, BasicAuthentication]
    permission_classes = [AllowAny]
    def get(self, request, event_id):
        try:
            event = Event.objects.get(id=event_id)
        except Event.DoesNotExist:
            return Response({'error': 'Event not found'}, status=status.HTTP_404_NOT_FOUND)

        ratings = event.ratings.filter(parent__isnull=True).order_by('-created_at')
        serializer = RatingSerializer(ratings, many=True)

        avg_rating = Rating.objects.filter(event=event).aggregate(avg=Avg('rating'))['avg'] or 0.0

        return Response({
            'rating': round(avg_rating, 1),
            'data': serializer.data
        }, status=status.HTTP_200_OK)