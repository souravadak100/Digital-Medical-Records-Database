from django.shortcuts import render
from django.core import serializers
from rest_framework import generics, status
from rest_framework.response import Response
from appointments.serializers import RegisterSerializer
from appointments.models import BookAppointments

# Method to book an appointment
class RegisterCreateView(generics.CreateAPIView):
    serializer_class = RegisterSerializer

    def create(self, request, *args, **kwargs):
        serializer = RegisterSerializer(data = request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data,status=status.HTTP_201_CREATED )
        
# Method to edit appointment details
class EditUserView(generics.RetrieveUpdateAPIView):
    serializer_class = RegisterSerializer
    
    def update(self, request, pk=None):
        try:
            user = BookAppointments.objects.get(pk=pk)
            serializer = RegisterSerializer(user, data=request.data, partial=True)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_200_OK)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except BookAppointments.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

# Method to list all the appointments
class ListUserView(generics.ListAPIView):
    serializer_class = RegisterSerializer
    queryset = BookAppointments.objects.all()
    
# Method to list a particular appointment
class SingleUserView(generics.RetrieveAPIView):
    serializer_class = RegisterSerializer
    
    def get(self, request, pk=None):
        try:
            queryset = BookAppointments.objects.get(pk=pk)
            serializer = RegisterSerializer(queryset)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except BookAppointments.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

# Method to delete the appointments
class DeleteUserView(generics.DestroyAPIView):
    serializer_class = RegisterSerializer
    
    def delete(self, request, pk=None):
        try:
            user = BookAppointments.objects.get(pk=pk)
            user.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        except BookAppointments.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)