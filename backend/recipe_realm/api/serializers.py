from rest_framework import serializers
from .models import User,Recipe,SavedRecipe,Review
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from django.contrib.auth import authenticate



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
class Loginserializer(serializers.Serializer):
    name = serializers.CharField(max_length=150)
    password = serializers.CharField(max_length=128)

    def validate(self, data):
        name = data.get('name')
        password = data.get('password')

        if not name and password:
            raise serializers.ValidationError("Username and password are required.")

        user = authenticate(username=name, password=password)
        if not user:
            raise serializers.ValidationError("Invalid credentials.")
        
        data['user'] = user
        return data


class RecipeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Recipe
        fields = ['recipetype', 'description', 'ingredients', 'title', 'minutes_to_cook', 'user']

        def create(self, validated_data):
            # user = self.context['request'].user
            # print("User: ", user)
            # print("Validated data: ", validated_data)
            return Recipe.objects.create(**validated_data)

class SavedRecipeSerializer(serializers.ModelSerializer):
    class Meta:
        model = SavedRecipe
        fields = ['recipe', 'user']

class ReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = ['review_id', 'user', 'recipe', 'description', 'dateposted', 'rating']
