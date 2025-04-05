import jwt
import datetime
from django.conf import settings

# Generate JWT access token
def generate_access_token(user):
    payload = {
      'user_email': user.data['user_email'],
      'iat': datetime.datetime.now(),
      'exp': datetime.datetime.now() + datetime.timedelta(days=1)
    }
    access_token = jwt.encode(payload, settings.SECRET_KEY, algorithm='HS256') 
     
    return access_token

# Generate JWT refresh token
def generate_refresh_token(user):
    refresh_token_payload = {
      'user_email': user.data['user_email'],
      'iat': datetime.datetime.now(),
      'exp': datetime.datetime.now() + datetime.timedelta(days=7)
    }
    refresh_token = jwt.encode(refresh_token_payload, settings.SECRET_KEY, algorithm='HS256')

    return refresh_token