from django.urls import path
from . import  views

urlpatterns = [
	path('', views.index, name="index")
	path('/<int:tvshow_id>', views.view, name="view")
]