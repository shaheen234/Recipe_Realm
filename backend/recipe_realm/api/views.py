from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, permissions
from .models import User
from .serializers import RecipeSerializer, UserSerializer,Loginserializer
from django.contrib.auth import authenticate
from rest_framework_simplejwt.tokens import RefreshToken


class UserSignupView(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            return Response({
                'user': UserSerializer(user).data,
                'message': 'User created successfully. You can now login with your credentials.'
            }, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class UserLoginView(APIView):
    def post(self, request):

            try:
                data=request.data
                serializer = Loginserializer(data=data)
                if serializer.is_valid():
                    user = serializer.validated_data['user']
                    refresh = RefreshToken.for_user(user)
                    acess=str(refresh.access_token)
                    response =  Response({
                        
                        'access': acess,
                        'message': 'Login successful!'
                    }, status=status.HTTP_200_OK)

                    response.set_cookie(key='jwt_access_token', value=acess, httponly=True)

                    # print(user.is_autheticated)
                    return response
            except Exception as e:
                    print(e)
                    return Response({'detail': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)
        
class AddRecipeView(APIView):
    

    def post(self, request, *args, **kwargs):
        print (request.user.is_authenticated)
        if not request.user.is_authenticated:
            return Response({"message": "User is not authenticated"}, status=status.HTTP_401_UNAUTHORIZED)
         
        serializer = RecipeSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(user=request.user)  # Automatically set the user field to the logged-in user
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
