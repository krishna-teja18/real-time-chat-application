from django.contrib.auth import get_user_model
from django.contrib.auth.hashers import check_password
from django.shortcuts import get_object_or_404
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.tokens import RefreshToken
from .serializers import UserSerializer, RegisterSerializer

User = get_user_model()

@api_view(['POST'])
def register(request):
    serializer = RegisterSerializer(data=request.data)
    if serializer.is_valid():
        user = serializer.save()
        return Response({"message": "User registered successfully"}, status=201)
    return Response(serializer.errors, status=400)

@api_view(['POST'])
def login(request):
    email = request.data.get('email')
    password = request.data.get('password')
    user = get_object_or_404(User, email=email)
    if check_password(password, user.password):
        refresh = RefreshToken.for_user(user)
        return Response({
            'refresh': str(refresh),
            'access': str(refresh.access_token),
        }, status=200)
    return Response({"detail": "Invalid credentials"}, status=400)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def profile(request):
    user = request.user
    serializer = UserSerializer(user)
    return Response(serializer.data, status=200)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def list_users(request):
    users = User.objects.exclude(id=request.user.id)
    serializer = UserSerializer(users, many=True)
    return Response({"users": serializer.data, "logged_in_user": UserSerializer(request.user).data})

