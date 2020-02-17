from django.shortcuts import render
from django.http import Http404

from .models import Movie

# Create your views here.

def index(request):
	#movies = Movie.objects
	results = {'movies':'movies'}
	return render(request,'movies/index.html', results)


def view(request, movie_id):
	#movie = get_object_or_404(Movie,pk=movie_id)
	retsult = {'movie':'movie'}
	return render(request, 'movies/view.html', result)