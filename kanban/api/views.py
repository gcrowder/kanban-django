from rest_framework import viewsets
from django.views.decorators.csrf import ensure_csrf_cookie
from .models import Task
from .serializers import TaskSerializer


# @ensure_csrf_cookie
class TaskViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows tasks to be viewed or edited.
    """
    queryset = Task.objects.all().order_by('id')
    serializer_class = TaskSerializer
