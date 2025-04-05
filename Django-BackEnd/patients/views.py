from patients.models import Register
from rest_framework import generics, status
from rest_framework.response import Response
from patients.serializers import RegisterSerializer, ViewSerializer

#Method to register a new Patient
class RegisterCreateView(generics.CreateAPIView):
    serializer_class = RegisterSerializer

    def create(self, request, *args, **kwargs):   
        serializer = RegisterSerializer(data = request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)

#Method to edit patient details
class EditUserView(generics.RetrieveUpdateAPIView):
    serializer_class = RegisterSerializer
    
    def update(self, request, pk=None):
        try:
            user = Register.objects.get(pk=pk)
            serializer = RegisterSerializer(user, data=request.data, partial=True)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_200_OK)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Register.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
    
#Method to list all the patients
class ListUserView(generics.ListAPIView):
    serializer_class = ViewSerializer
    queryset = Register.objects.all()
   
#Method to view a single patient    
class SingleUserView(generics.RetrieveAPIView):
    serializer_class = ViewSerializer
    
    def get(self, request, pk=None):
        try:
            user = Register.objects.get(pk=pk)
            serializer = ViewSerializer(user)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Register.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

#Method to delete a single patient
class DeleteUserView(generics.DestroyAPIView):
    serializer_class = RegisterSerializer
    
    def delete(self, request, pk=None):
        try:
            user = Register.objects.get(pk=pk)
            user.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        except Register.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

