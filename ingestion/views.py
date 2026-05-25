from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import NormalizedActivity
from .serializers import ActivitySerializer

@api_view(['GET'])
def get_dashboard_data(request):   # <-- Make sure this is spelled exactly like this!
    """Fetches all rows so the carbon analyst can see them on the frontend"""
    records = NormalizedActivity.objects.all()
    serializer = ActivitySerializer(records, many=True)
    return Response(serializer.data)

@api_view(['POST'])
def approve_record(request, record_id): # <-- Make sure this is 'record_id'
    try:
        # We look up the row using the exact ID sent by React
        record = NormalizedActivity.objects.get(id=record_id)
        record.status = 'APPROVED'
        record.save()
        return Response({'status': 'success', 'message': 'Record approved successfully'})
    except NormalizedActivity.DoesNotExist:
        return Response({'status': 'error', 'message': 'Record not found'}, status=404)