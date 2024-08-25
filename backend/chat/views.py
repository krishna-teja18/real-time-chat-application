from django.shortcuts import get_object_or_404
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .models import Message
from .serializers import MessageSerializer
from interests.models import Interest

@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def chat_view(request, interest_id):
    interest = get_object_or_404(Interest, id=interest_id, is_accepted=True)
    # print(interest.sender)
    # print(interest.participants)
    # print(request.user)
    # print(interest.participants.all())

    if request.user not in interest.participants.all():
        return Response({"error": "You do not have permission to view this chat."}, status=403)

    if request.method == 'GET':
        messages = Message.objects.filter(interest=interest).order_by('timestamp')
        serializer = MessageSerializer(messages, many=True)
        messages_dict = {message['id']: message for message in serializer.data}
        return Response(messages_dict, status=200)

    if request.method == 'POST':
        content = request.data.get('content')
        if content:
            message = Message.objects.create(
                interest=interest,
                sender=request.user,
                content=content
            )
            serializer = MessageSerializer(message)
            return Response(serializer.data, status=201)
        return Response({"error": "Content is required"}, status=400)
