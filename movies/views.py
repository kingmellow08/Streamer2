from django.shortcuts import render
from django.http import Http404

from .models import Movie

# Create your views here.

def index(request):
	movies = Movie.objects
	return render(request,'movies/index.html', {'movies':movies})


def view(request, movie_id)
	movie = get_object_or_404(Movie,pk=movie_id)
	return render(request, 'movies/view.html', {'movie':movie})