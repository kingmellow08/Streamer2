from django.urls import path
from . import  views

urlpatterns = [
	path('', views.index, name="index"),
	path('<int:movie_id>', views.view, name="view"),
]