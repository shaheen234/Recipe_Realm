from django.urls import path
from .views import AddRecipeView, UserSignupView, UserLoginView
from rest_framework_simplejwt.views import TokenRefreshView

urlpatterns = [
    path('signup/', UserSignupView.as_view(), name='signup'),
    path('login/', UserLoginView.as_view(), name='login'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('add-recipe/', AddRecipeView.as_view(), name='add-recipe'),
]
