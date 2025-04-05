from rest_framework import status
from rest_framework import generics
from register.models import RegisterUser
from rest_framework.response import Response
from register.auth import generate_access_token
from register.serializers import RegisterSerializer, SigninSerializer

#Method to register a new user 
class RegisterCreateView(generics.CreateAPIView):

    def create(self, request, *args, **kwargs):
        # Create a new user
        createdUser = RegisterSerializer.create(self=self, validated_data=request.data)
        serializedUser = RegisterSerializer(createdUser) 
        
        # Generate JWT token
        token = generate_access_token(serializedUser)
        
        return Response({"user": serializedUser.data, "token": token}, status=status.HTTP_201_CREATED)
    
    @staticmethod
    def check_details(data):
        return len(data['user_name']) < 11 and len(data['password']) < 10

#Method to login an existing user
class SigninRetrieveView(generics.CreateAPIView):  
    def create(self, request, *args, **kwargs):
        try:
            # Login an existing user
            loggedInUser = SigninSerializer.create(self=self, validated_data=request.data)
            serializedUser = SigninSerializer(loggedInUser)
            
            # Generate JWT token
            token = generate_access_token(serializedUser)
            
            return Response({"user": serializedUser.data, "token": token}, status=status.HTTP_200_OK)
        
        except RegisterUser.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

#Method to list all the Users
class ListUserView(generics.ListAPIView):
    serializer_class = RegisterSerializer
    queryset = RegisterUser.objects.all()

#Method to list a particular user 
class SingleUserView(generics.RetrieveAPIView):
    serializer_class = RegisterSerializer
   
    def get(self, request, pk=None):
        try:
            user = RegisterUser.objects.get(pk=pk)
            serializer = RegisterSerializer(user)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except RegisterUser.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

#Method to edit details of a particular user
class EditUserView(generics.RetrieveUpdateAPIView):
    def update(self, request, pk=None):
        try:
            user = RegisterUser.objects.get(pk=pk)
            serializer = RegisterSerializer(user, data=request.data, partial=True)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_200_OK)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except RegisterUser.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
