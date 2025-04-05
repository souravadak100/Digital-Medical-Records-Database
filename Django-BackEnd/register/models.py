from django.db import models
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, BaseUserManager

class MyUserManager(BaseUserManager):
    def create_user(self, user_name, user_email, user_dob, location, user_mobile, password=None):
        """
        Creates and saves a User with the given user_name, user_email, user_dob,
        location, user_mobile, and password.
        """
        if not user_email:
            raise ValueError("Users must have an user_email address")

        user = self.model(
            user_email=self.normalize_email(user_email),
            user_name=user_name,
            location=location,
            user_mobile=user_mobile,
            user_dob=user_dob,
        )

        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, user_email, user_dob, password=None):
        """
        Creates and saves a superuser with the given user_email, date of
        birth and password.
        """
        user = self.create_user(
            user_email,
            password=password,
            user_dob=user_dob,
        )
        user.is_admin = True
        user.save(using=self._db)
        return user
      
class RegisterUser(AbstractBaseUser, PermissionsMixin):
	id = models.AutoField(primary_key=True)
	user_name = models.CharField(max_length=255, null=False)
	user_email = models.EmailField(unique=True)
	password = models.CharField(max_length=30, null=False)
	user_dob = models.DateField(null=False)
	location = models.CharField(max_length=255, null=False)
	user_mobile = models.CharField(max_length=10, null=False)
		
	objects = MyUserManager()
	
	USERNAME_FIELD = 'user_email'
	REQUIRED_FIELDS = []
	
	def __str__(self):
		return self.user_email