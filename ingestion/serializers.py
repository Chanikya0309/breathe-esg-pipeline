from rest_framework import serializers
from .models import NormalizedActivity

class ActivitySerializer(serializers.ModelSerializer):
    class Meta:         # <-- Change '__all__' to 'Meta' here
        model = NormalizedActivity
        fields = '__all__'  # This one is correct! Keep it.