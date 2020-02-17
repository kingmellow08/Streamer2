from django.shortcuts import render
from django.http import Http404

from .models import TvShow

# Create your views here.

def index(request):
	#tvshows = TvShow.objects
	results = {'tvshow':'tvshow'};
	return render(request,'tvshows/index.html', results)


def view(request, tvshow_id):
	#tvshow = get_object_or_404(TvShow,pk=tvshow_id)
	result = {'tvshow':'tvshow'};
	return render(request, 'tvshows/view.html', result)