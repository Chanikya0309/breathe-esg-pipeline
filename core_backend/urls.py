from django.contrib import admin
from django.urls import path, include  # Make sure 'include' is imported here!

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('ingestion.urls')), # This links your new file to the main system!
]