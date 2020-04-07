from django.shortcuts import render
from django.http import Http404
from django.http import JsonResponse
import requests

from .models import Movie

#movie api_token/key
api_key = '5c03bb22d6ff48ee362e4ab97884a6e2'
append_to = "&append_to_response="


# Create your views here.
def index(request):
	movies = {};
	if request.method == "POST":		
		sort = request.POST.get("sort");
		genre = request.POST.get("genre");
		if not sort:
			sort = "popular";

		url = 'https://api.themoviedb.org/3/movie/'+sort+'?api_key='+api_key;
		resp = requests.get(url);
		movies = resp.json();
		return JsonResponse(movies);
	
	return render(request,'movies.html', movies)


def view(request, movie_id):
	movie = {};
	if request.method == "POST":
		append_to_response = append_to + "videos,images,credits";
		if(movie_id):
			url = 'https://api.themoviedb.org/3/movie/'+str(movie_id)+'?api_key='+api_key+append_to_response;
			resp = requests.get(url);
			movie = resp.json();
			
	return JsonResponse(movie);