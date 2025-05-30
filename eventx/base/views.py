from rest_framework import generics
from users.models import User
from rest_framework.permissions import AllowAny
from rest_framework.serializers import ModelSerializer
from rest_framework.response import Response
from .serializers import RegisterSerializer

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
    
        