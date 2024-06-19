from rest_framework_simplejwt.tokens import AccessToken
from django.contrib.auth import get_user_model
from rest_framework.exceptions import AuthenticationFailed

def get_user_from_token(token):
    try:
        access_token = AccessToken(token)
        user_id = access_token['user_id']
        User = get_user_model()
        user = User.objects.get(id=user_id)
        return user
    except Exception as e:
        raise AuthenticationFailed('Invalid token')
