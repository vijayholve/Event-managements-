from rest_framework.views import APIView
from rest_framework.response import Response
from .models import EventRegistration, Event
from .serializers import EventRegistrationSerializer, EventSerializer
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import TokenAuthentication, SessionAuthentication,BasicAuthentication
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.permissions import AllowAny
from django.shortcuts import get_object_or_404

class EventView(APIView):
    authentication_classes = [JWTAuthentication]
    authentication_classes += [SessionAuthentication, BasicAuthentication]
    permission_classes = [IsAuthenticated]

    # permission_classes = [IsAuthenticated]  # or JWTAuthentication
    def get(self, request,pk=None):
        if pk:
            # Get single event
            event = get_object_or_404(Event, pk=pk, is_blocked=False)
            serializer = EventSerializer(event)
            return Response({
                'status': 200,
                'message': 'Event Detail',
                'data': serializer.data
            })
        events = Event.objects.filter(is_blocked=False)
        serializer = EventSerializer(events, many=True)
        return Response({
            'status': 200,
            'message': 'Event List',
            'data': serializer.data
        })

    def post(self, request):
        serializer = EventSerializer(data=request.data, context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return Response({
                'status': 201,
                'message': 'Event Created',
                'data': serializer.data
            })
        return Response({
            'status': 400,
            'message': 'Event Creation Failed',
            'errors': serializer.errors
        })

    # def put(self, request, pk=None):
    #     if not pk:
    #         return Response({'status': 400, 'message': 'Event ID is required for update'}, status=400)

    #     event = get_object_or_404(Event, pk=pk)

    #     if event.organizer.role != "organizer":
    #         return Response({'status': 403, 'message': 'You do not have permission to edit this event.'}, status=403)
    #     print("Request User:", request.user)
    #     print("Event Organizer:", event.organizer)
    #     serializer = EventSerializer(event, data=request.data, partial=True, context={'request': request})
        
    #     if serializer.is_valid():
    #         serializer.save()
    #         return Response({'status': 200, 'message': 'Event Updated', 'data': serializer.data}, status=200)

    #     return Response({'status': 400, 'message': 'Event Update Failed', 'errors': serializer.errors}, status=400)
    def patch(self, request, pk=None):
        if not pk:
            return Response({'status': 400, 'message': 'Event ID is required for update'}, status=400)

        event = get_object_or_404(Event, pk=pk)

        if event.organizer.role != "organizer":
            return Response({'status': 403, 'message': 'You do not have permission to edit this event.'}, status=403)
        print("Request User:", request.user)
        print("Event Organizer:", event.organizer)
        serializer = EventSerializer(event, data=request.data, partial=True, context={'request': request})
        
        if serializer.is_valid():
            serializer.save()
            return Response({'status': 200, 'message': 'Event Updated', 'data': serializer.data}, status=200)

        return Response({'status': 400, 'message': 'Event Update Failed', 'errors': serializer.errors}, status=400)

    def delete(self, request, pk=None):
        if not pk:
            return Response({
                'status': 400,
                'message': 'Event ID is required for deletion'
            })

        if event := Event.objects.filter(pk=pk).first():
            event.is_blocked = True
            event.save()
            return Response({
                'status': 200,
                'message': 'Event Deleted (Blocked)',
                'data': {
                    'event_id': pk,
                    'event_title': event.title
                }
            })
        return Response({
            'status': 404,
            'message': 'Event Not Found',
            'data': {'event_id': pk}
        })
    
class EventRegisterView(APIView):
    authentication_classes = [JWTAuthentication]
    authentication_classes += [SessionAuthentication, BasicAuthentication]
    permission_classes = [IsAuthenticated]

    # permission_classes = [IsAuthenticated]  # or JWTAuthentication
    def get(self, request,pk=None):
        if pk:
            # Get single event
            eventRegistration = get_object_or_404(EventRegistration, pk=pk, is_blocked=False)
            serializer = EventRegistrationSerializer(eventRegistration)
            return Response({
                'status': 200,
                'message': 'EventRegistration Detail',
                'data': serializer.data
            })
        eventRegistrations = EventRegistration.objects.filter(is_blocked=False)
        serializer = EventRegistrationSerializer(eventRegistrations, many=True)
        return Response({
            'status': 200,
            'message': 'EventRegistration List',
            'data': serializer.data
        })

    def post(self, request):
        serializer = EventRegistrationSerializer(data=request.data, context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return Response({
                'status': 201,
                'message': 'EventRegistration Created',
                'data': serializer.data
            })
        return Response({
            'status': 400,
            'message': 'EventRegistration Creation Failed',
            'errors': serializer.errors
        })
    def delete(self, request, pk=None):
        if not pk:
            return Response({
                'status': 400,
                'message': 'EventRegistration ID is required for deletion'
            })

        if eventRegistration := EventRegistration.objects.filter(pk=pk).first():
            eventRegistration.is_blocked = True
            eventRegistration.save()
            return Response({
                'status': 200,
                'message': 'EventRegistration Deleted (Blocked)',
                'data': {
                    'event_id': pk,
                    'event_title': eventRegistration.event.title
                }
            })
        return Response({
            'status': 404,
            'message': 'EventRegistration Not Found',
            'data': {'event_id': pk}
        })
