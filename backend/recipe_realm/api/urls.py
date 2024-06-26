from django.urls import path
from .views import *
from rest_framework_simplejwt.views import TokenRefreshView

urlpatterns = [
    path('signup/', UserSignupView.as_view(), name='signup'),
    path('login/', UserLoginView.as_view(), name='login'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('add-recipe/', AddRecipeView.as_view(), name='add-recipe'),
    path('get_all_recipes/', GetAllRecipeView.as_view()),
    path('get_recipe_detail/<int:recipe_id>/', GetDetailedRecipeView.as_view()),
    path('delete_recipe/<int:recipe_id>/',DeleteRecipeView.as_view()),
    path('myrecipe/',MyrecipeView.as_view())
]
