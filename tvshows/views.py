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
	if request.method == "POST":		
		sort = request.POST.get("sort");
		genre = request.POST.get("genre");
		if not sort:
			sort = "popular";

		url = 'https://api.themoviedb.org/3/tv/'+sort+'?api_key='+api_key;
		resp = requests.get(url);
		tvshows = resp.json();
		return JsonResponse(tvshows);

	
	return render(request,'index.html', results)


#this is individual tvshow
def view(request, tvshow_id):
	tvshow = {};
	if request.method == "POST":
		append_to_response = append_to + "videos,images,credits";\
		v_id = request.POST.get("id");
		if(v_id):
			url = 'https://api.themoviedb.org/3/tv/'+v_id+'?api_key='+api_key+append_to_response;
			resp = requests.get(url);
			tvshow = resp.json();
			
	return JsonResponse(tvshow);
	