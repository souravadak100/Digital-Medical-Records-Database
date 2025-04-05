from django.contrib.auth import get_user_model, authenticate
from rest_framework import serializers
from register.models import RegisterUser

User = get_user_model()

class RegisterSerializer(serializers.ModelSerializer):
	class Meta:
			model = RegisterUser
			fields = ("user_name", "user_email", "password", "user_dob", "location", "user_mobile")
			extra_kwargs = {"password" : {"write_only": True}}

	def create(self, validated_data):
			user = User.objects.create_user(
        user_name=validated_data["user_name"],
				user_email=validated_data["user_email"],
				password=validated_data["password"],
				user_dob=validated_data["user_dob"],
				location=validated_data["location"] ,
        user_mobile=validated_data["user_mobile"]      
        )
   
			return user
		
class SigninSerializer(serializers.ModelSerializer):
	class Meta:
			model = RegisterUser
			fields = ("user_name", "user_email", "user_dob", "location", "user_mobile")

	def create(self, validated_data):
			user = authenticate(**validated_data)
	
			if user and user.is_active:
					return user
			raise serializers.ValidationError("Incorrect Credentials")
		
