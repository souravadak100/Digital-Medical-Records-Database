from django.contrib import admin
from appointments.views import RegisterCreateView, EditUserView, ListUserView, DeleteUserView, SingleUserView
from django.urls import path, include

urlpatterns = [
	path('appointment/register', RegisterCreateView.as_view(), name='register-appointment'),
	path('appointment/list', ListUserView.as_view(), name='list-appointment'),
	path('appointment/view/<int:pk>', SingleUserView.as_view(), name='view-appointment'),
	path('appointment/edit/<int:pk>', EditUserView.as_view(), name='edit-appointment'),
	path('appointment/delete/<int:pk>', DeleteUserView.as_view(), name='delete-appointment')
	]