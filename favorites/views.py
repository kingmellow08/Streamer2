from django.shortcuts import render
from django.http import Http404

from .models import Favorites

# Create your views here.

def index(request, ):	
	results = {'favorites':'favorites'}
	return render(request,'index.html', results)

