from django.shortcuts import render
from django.http import Http404
from django.http import JsonResponse
import requests

from .models import TvShow

#movie api_token/key
api_key = '5c03bb22d6ff48ee362e4ab97884a6e2'
append_to = "&append_to_response="

# this is for all tvshow and result from search
def index(request):
	results = {'tvshows':''};
	params = "?api_key="+api_key;
	if request.method == "POST":		
		page = request.POST.get("sort");
		sort = request.POST.get("sort");
		genre = request.POST.get("genre");
		if not sort:
			sort = "popular";
		if page:
			params = params + "&page="+page;

		url = 'https://api.themoviedb.org/3/tv/'+sort+params;
		resp = requests.get(url);
		tvshows = resp.json();
		return JsonResponse(tvshows);

	
	return render(request,'index.html', results)


#this is individual tvshow
def view(request, tvshow_id):
	tvshow = {};
	if request.method == "POST":
		append_to_response = append_to + "videos,images,credits";
		if(tvshow_id):
			url = 'https://api.themoviedb.org/3/tv/'+str(tvshow_id)+'?api_key='+api_key+append_to_response;
			resp = requests.get(url);
			tvshow = resp.json();
			
	return JsonResponse(tvshow);


def cast(request, cast_id):
	cast = {};
	if request.method == "POST":
		append_to_response = append_to + "tv_credits,movie_credits";
		if(cast_id):
			url = 'https://api.themoviedb.org/3/person/'+str(cast_id)+'?api_key='+api_key+append_to_response;
			resp = requests.get(url);
			cast = resp.json();
			
	return JsonResponse(cast);
	