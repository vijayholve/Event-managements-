from rest_framework import generics
from .models import EventRegistration
from .serializers import EventRegistrationSerializer

class EventRegistrationView(generics.CreateAPIView):
    queryset = EventRegistration.objects.all()
    serializer_class = EventRegistrationSerializer

    def perform_create(self, serializer):
        print("Request data:", self.request.data)
        serializer.save()
