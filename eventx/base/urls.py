from django.urls import path
from .views import RegisterView 
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from . import views
urlpatterns = [
    path('api/register/', RegisterView.as_view(), name='register'),
    path('api/login/', TokenObtainPairView.as_view(), name='login'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/dashboard/user/', views.DashboardUserView.as_view(), name='dashboard'),
    path('api/dashboard/event/', views.DashboardEventView.as_view(), name='dashboard'),
    path('events/<int:event_id>/feedback/', views.CommentWithRatingAPIView.as_view(), name='comment-with-rating'),
    path('events/<int:event_id>/comment/', views.CommentAPIView.as_view(), name='comment-with-rating'),
]

