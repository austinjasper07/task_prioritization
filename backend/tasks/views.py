from django.shortcuts import render
from rest_framework import viewsets, permissions, generics
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import Task
from .serializers import TaskSerializer, UserSerializer
from .predictor import predict_task
from django.contrib.auth.models import User

class RegisterView(generics.CreateAPIView):
    permission_classes = [permissions.AllowAny]
    serializer_class = UserSerializer

    def create(self, request, *args, **kwargs):
        username = request.data.get('username')
        password = request.data.get('password')
        email = request.data.get('email')

        if not username or not password:
            return Response(
                {'detail': 'Username and password required'},
                status=400
            )

        if User.objects.filter(username=username).exists():
            return Response(
                {'detail': 'Username already exists'},
                status=400
            )

        user = User.objects.create_user(
            username=username,
            password=password,
            email=email
        )

        return Response(
            {'id': user.id, 'username': user.username},
            status=201
        )

    queryset = User.objects.all()
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')
        email = request.data.get('email')

        if not username or not password:
            return Response(
                {'detail': 'Username and password required'},
                status=400
            )

        if User.objects.filter(username=username).exists():
            return Response(
                {'detail': 'Username already exists'},
                status=400
            )

        user = User.objects.create_user(
            username=username,
            password=password,
            email=email
        )

        return Response(
            {'id': user.id, 'username': user.username},
            status=201
        )

    queryset = User.objects.all()
    serializer_class = UserSerializer

    def create(self, request, *args, **kwargs):
        username = request.data.get('username')
        password = request.data.get('password')
        email = request.data.get('email')
        if not username or not password:
            return Response({'detail':'username and password required'}, status=400)
        user = User.objects.create_user(username=username, password=password, email=email)
        serializer = self.get_serializer(user)
        return Response(serializer.data, status=201)

class TaskViewSet(viewsets.ModelViewSet):
    serializer_class = TaskSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Task.objects.filter(owner=self.request.user).order_by('-created_at')

    def perform_create(self, serializer):
        task = serializer.save(owner=self.request.user)

        label, confidence, reason = predict_task(task)

        task.priority_label = str(label)
        task.priority_confidence = float(confidence)
        task.priority_reason = str(reason)

        task.save()



    def perform_update(self, serializer):
        task = serializer.save()

        label, confidence, reason = predict_task(task)

        task.priority_label = str(label)
        task.priority_confidence = float(confidence)
        task.priority_reason = str(reason)

        task.save()



    @action(detail=True, methods=['post'])
    def predict(self, request, pk=None):
        task = self.get_object()

        label, confidence, reason = predict_task(task)

        task.priority_label = str(label)
        task.priority_confidence = float(confidence)
        task.priority_reason = str(reason)

        task.save()

        return Response({
            'label': task.priority_label,
            'confidence': task.priority_confidence,
            'reason': task.priority_reason
        })
