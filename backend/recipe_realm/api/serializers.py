from rest_framework import serializers
from .models import User,Recipe,SavedRecipe,Review
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['user_id', 'name', 'password']
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['name'],  # Using 'name' as 'username' for authentication purposes
            password=validated_data['password'],
            name=validated_data['name']
        )
        return user
class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    username_field = 'name'

    def validate(self, attrs):
        attrs['username'] = attrs.get('name')
        return super().validate(attrs)


class RecipeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Recipe
        fields = ['recipetype', 'recipe_id', 'description', 'ingredients', 'title', 'minutes_to_cook', 'user']

        def create(self, validated_data):
            return Recipe.objects.create(**validated_data)

class SavedRecipeSerializer(serializers.ModelSerializer):
    class Meta:
        model = SavedRecipe
        fields = ['recipe', 'user']

class ReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = ['review_id', 'user', 'recipe', 'description', 'dateposted', 'rating']
