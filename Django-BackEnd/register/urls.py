from django.contrib import admin
from register.views import RegisterCreateView, ListUserView, SigninRetrieveView, SingleUserView, EditUserView
from django.urls import path, include

urlpatterns = [
	path('register', RegisterCreateView.as_view(), name='register'),
 	path('listuser', ListUserView.as_view(), name='list_user'),
	path('signin', SigninRetrieveView.as_view(), name='signin'),
  path('viewprofile/<int:pk>', SingleUserView.as_view(), name='single_user'),
  path('editprofile/<int:pk>', EditUserView.as_view(), name='edit_user'),
	]