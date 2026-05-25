from django.urls import path
from . import views

urlpatterns = [
    path('api/dashboard/', views.get_dashboard_data),
    path('api/approve/<str:record_id>/', views.approve_record), # <-- Change this to <str:record_id>
]