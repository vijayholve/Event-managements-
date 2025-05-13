from django.contrib import admin
from django.urls import path,include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/vendors/', include('vendors.urls')),
    path('api/users/', include('users.urls')),
    path('', include('base.urls')),
    path('api/events/', include('events.urls')),
    path('api/auth/', include('accounts.urls')),
]
