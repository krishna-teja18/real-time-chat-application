from django.shortcuts import get_object_or_404
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .models import Interest
from .serializers import InterestSerializer
from django.contrib.auth import get_user_model

User = get_user_model()

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def send_interest(request, recipient_id):
    recipient = get_object_or_404(User, id=recipient_id)
    interest = Interest.objects.create(
        sender=request.user,
        recipient=recipient,
        message=request.data.get('message')
    )
    return Response({"message": "Interest sent successfully"}, status=201)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def list_interests(request):
    received_interests = Interest.objects.filter(recipient=request.user)
    serializer = InterestSerializer(received_interests, many=True)
    return Response({
        'received_interests': serializer.data,
        'logged_in_user': {
            'id': request.user.id,
            'username': request.user.username
        }
    }, status=200)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def respond_interest(request, interest_id):
    interest = get_object_or_404(Interest, id=interest_id)
    
    if interest.recipient != request.user and interest.sender != request.user:
        return Response({"error": "You do not have permission to respond to this request."}, status=403)
    
    is_accepted = request.data.get('is_accepted')
    if is_accepted is not None:
        interest.is_accepted = is_accepted
        interest.save()
        return Response({"message": "Interest response recorded"}, status=200)
    
    return Response({"error": "Invalid data"}, status=400)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def accepted_interests(request):
    sent_interests = Interest.objects.filter(sender=request.user, is_accepted=True)
    received_interests = Interest.objects.filter(recipient=request.user, is_accepted=True)
    interests = sent_interests | received_interests
    serializer = InterestSerializer(interests, many=True)
    return Response(serializer.data, status=200)
