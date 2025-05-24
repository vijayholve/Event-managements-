from django.urls import path
from . import views 

urlpatterns = [
    path('events-view/',views.EventView.as_view(),name="events-view"),
        path('events-view/<int:pk>/', views.EventView.as_view()),    # GET one, PUT update, DELETE block
 path('eventregisters-view/',views.EventRegisterView.as_view(),name="events-view"),
        path('eventregisters-view/<int:pk>/', views.EventRegisterView.as_view()),    # GET one, PUT update, DELETE block

]
