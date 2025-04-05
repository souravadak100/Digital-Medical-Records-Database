from django.contrib import admin
from patients.views import RegisterCreateView, EditUserView, ListUserView, SingleUserView, DeleteUserView
from django.urls import path, include

urlpatterns = [	
	path('patients/register', RegisterCreateView.as_view(), name='register-patients'),
	path('patients/list', ListUserView.as_view(), name='list-patients'),
	path('patients/view/<int:pk>', SingleUserView.as_view(), name='view-patients'),
	path('patients/edit/<int:pk>', EditUserView.as_view(), name='edit-patients'),
	path('patients/delete/<int:pk>', DeleteUserView.as_view(), name='delete-patients')
	]	