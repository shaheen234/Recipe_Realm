from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, permissions
from .models import User, Recipe
from .serializers import RecipeSerializer, UserSerializer,Loginserializer, RecipeiesSerializer
from django.contrib.auth import authenticate
from rest_framework_simplejwt.tokens import RefreshToken
import jwt
from django.conf import settings

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
                else:
                    return Response({'detail': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)
            except Exception as e:
                    print(e)
                    return Response({'detail': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)
        
class AddRecipeView(APIView):
    

    def post(self, request, *args, **kwargs):
        token = request.COOKIES.get('jwt_access_token')
        if token:
            if token.startswith('Bearer '):
                token = token.split(' ')[1]

            try:
                decoded_token = jwt.decode(token, settings.SECRET_KEY, algorithms=["HS256"])
                user_id = decoded_token.get('user_id')
                if user_id:
                    try:
                        user = User.objects.get(user_id=user_id)
                    except User.DoesNotExist:
                        
                        return Response({'details':'User does not exist'}, status=status.HTTP_400_BAD_REQUEST)
            except jwt.ExpiredSignatureError:
                print("hello")
                return Response({'details':'JWT has expired'}, status=status.HTTP_400_BAD_REQUEST)
            except jwt.InvalidTokenError:
                return Response({'details':'Invalid JWT'}, status=status.HTTP_400_BAD_REQUEST)
        data = request.data.copy()
        data['user']=user_id
        print(data)
        serializer = RecipeSerializer(data=data)
        print(serializer.is_valid())
        if serializer.is_valid():
            serializer.save()
        return Response(
            {
            'recipe': serializer.data,
            'detail':'recipe has been added'
            },
            status=status.HTTP_201_CREATED
            )
class GetAllRecipeView(APIView):
    def get(self, request):
        recipies = RecipeiesSerializer(Recipe.objects.all(), many=True)
        if recipies:
            return Response(
            {
            'recipe': recipies.data,
            'detail':'Found these Recipies'
            },
            status=status.HTTP_200_OK
            )

class GetDetailedRecipeView(APIView):
    def get(self, request,recipe_id):
        recipe = Recipe.objects.get(pk=recipe_id)
        if not recipe:
            return Response({'details':'Recipe not FOund'}, status=status.HTTP_404_NOT_FOUND)
        user = recipe.user
        return Response(
            {
            'recipe': RecipeSerializer(recipe).data,
            "owner": UserSerializer(user).data,
            'detail':'Recipe Details'
            },
            status=status.HTTP_200_OK
            )
        
        

class AddComment(APIView):
    def post(self, request,recipe_id):
        token = request.COOKIES.get('jwt_access_token')
        if token:
            if token.startswith('Bearer '):
                token = token.split(' ')[1]
            try:
                decoded_token = jwt.decode(token, settings.SECRET_KEY, algorithms=["HS256"])
                user_id = decoded_token.get('user_id')
                if user_id:
                    try:
                        user = User.objects.get(user_id=user_id)
                    except User.DoesNotExist:
                        return Response({'details':'User does not exist'}, status=status.HTTP_400_BAD_REQUEST)
            except jwt.ExpiredSignatureError:
                return Response({'details':'JWT has expired'}, status=status.HTTP_400_BAD_REQUEST)
            except jwt.InvalidTokenError:
                return Response({'details':'Invalid JWT'}, status=status.HTTP_400_BAD_REQUEST)
        data = request.data.copy()
    
    
class DeleteRecipeView(APIView):
    
    def delete(self, request, recipe_id):
        token = request.COOKIES.get('jwt_access_token')
        if token:
            if token.startswith('Bearer '):
                token = token.split(' ')[1]
            try:
                decoded_token = jwt.decode(token, settings.SECRET_KEY, algorithms=["HS256"])
                user_id = decoded_token.get('user_id')
                if user_id:
                    try:
                        user = User.objects.get(user_id=user_id)
                    except User.DoesNotExist:
                        return Response({'details': 'User does not exist'}, status=status.HTTP_400_BAD_REQUEST)
            except jwt.ExpiredSignatureError:
                return Response({'details': 'JWT has expired'}, status=status.HTTP_400_BAD_REQUEST)
            except jwt.InvalidTokenError:
                return Response({'details': 'Invalid JWT'}, status=status.HTTP_400_BAD_REQUEST)
        
        try:
            recipe = Recipe.objects.get(recipe_id=recipe_id)
        except Recipe.DoesNotExist:
            return Response({'details': 'Recipe not found'}, status=status.HTTP_404_NOT_FOUND)

        if recipe.user.user_id != user_id:
            return Response({'details': 'You do not have permission to delete this recipe'}, status=status.HTTP_403_FORBIDDEN)

        recipe.delete()
        return Response({'details': 'Recipe deleted successfully'}, status=status.HTTP_204_NO_CONTENT)

class MyrecipeView(APIView):
    def get(self, request):
        token = request.COOKIES.get('jwt_access_token')
        if token:
            if token.startswith('Bearer '):
                token = token.split(' ')[1]
            try:
                decoded_token = jwt.decode(token, settings.SECRET_KEY, algorithms=["HS256"])
                user_id = decoded_token.get('user_id')
                if user_id:
                    try:
                        user = User.objects.get(user_id=user_id)
                    except User.DoesNotExist:
                        return Response({'details': 'User does not exist'}, status=status.HTTP_400_BAD_REQUEST)
            except jwt.ExpiredSignatureError:
                return Response({'details': 'JWT has expired'}, status=status.HTTP_400_BAD_REQUEST)
            except jwt.InvalidTokenError:
                return Response({'details': 'Invalid JWT'}, status=status.HTTP_400_BAD_REQUEST)
        
        recipes = Recipe.objects.filter(user_id=user_id)
        serializer = RecipeSerializer(recipes, many=True)
        return Response({'recipes': serializer.data}, status=status.HTTP_200_OK)
         




