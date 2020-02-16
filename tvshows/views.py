from django.shortcuts import render
from django.http import Http404

from .models import TvShow

# Create your views here.

def index(request):
	tvshows = TvShow.objects
	return render(request,'tvshows/index.html', {'tvshows':tvshows})


def view(request, tvshow_id)
	tvshow = get_object_or_404(TvShow,pk=tvshow_id)
	return render(request, 'tvshows/view.html', {'tvshow':tvshow})