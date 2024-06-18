from django.contrib import admin
from .models import User, Recipe, SavedRecipe, Review

@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    list_display = ['user_id', 'name', 'username']
    search_fields = ['name', 'username']

@admin.register(Recipe)
class RecipeAdmin(admin.ModelAdmin):
    list_display = ['recipe_id', 'title', 'recipetype', 'minutes_to_cook']
    search_fields = ['title', 'recipetype']

@admin.register(SavedRecipe)
class SavedRecipeAdmin(admin.ModelAdmin):
    list_display = ['id', 'user', 'recipe']
    search_fields = ['user__name', 'recipe__title']

@admin.register(Review)
class ReviewAdmin(admin.ModelAdmin):
    list_display = ['review_id', 'user', 'recipe', 'rating', 'dateposted']
    search_fields = ['user__name', 'recipe__title', 'rating']
