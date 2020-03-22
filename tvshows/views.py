from django.shortcuts import render
from django.http import Http404

from .models import TvShow

# this is for all tvshow and result from search
def index(request):
	#tvshows = TvShow.objects
	results = {'tvshows':range(180)};
	return render(request,'index.html', results)


#this is individual tvshow
def view(request, tvshow_id):
	#tvshow = get_object_or_404(TvShow,pk=tvshow_id)
	result = {'tvshow':'tvshow/view'};
	return render(request, 'view.html', result)