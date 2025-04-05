from rest_framework import serializers
from patients.models import Register

class RegisterSerializer(serializers.ModelSerializer):
		class Meta:
				model = Register
				fields = '__all__'

class ViewSerializer(serializers.ModelSerializer):
		bookappointments = serializers.StringRelatedField(many=True, read_only=True)
		class Meta:
				model = Register
				fields = ('id', 'user_name', 'user_email', 'user_dob', 'location', 'user_mobile', 'bookappointments')

