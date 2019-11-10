from django.db import models

# Create your models here.


class Movie(models.Model)
	title = models.TextField()
	status = models.CharField(max_length=200)
	description = models.TextField()
	rated = models.CharField(max_length=200)
	rated = models.CharField(max_length=200)
	network = models.CharField(max_length=200)
	released_date = models.CharField(max_length=200)
	show_type = models.CharField(max_length=200)
	run_time = models.TimeField(auto_now=false)
	image = models.TextField()
	bg_image = models.TextField()

	updated_at = models.DateTimeField(auto_now=True)
	created_at = models.DateTimeField(auto_now_add=True)

class Cast(models.Model)
	first_name = models.CharField(max_length=200)
	last_name = models.CharField(max_length=200)
	gender = models.CharField(max_length=200)

class Role(models.Model)
	role = models.CharField(max_length=200)
	updated_at = models.DateTimeField(auto_now=True)
	created_at = models.DateTimeField(auto_now_add=True)

class Genre(models.Model)
	genre = models.CharField(max_length=200)
	updated_at = models.DateTimeField(auto_now=True)
	created_at = models.DateTimeField(auto_now_add=True) 

class Keyword(models.Model)
	keyword = models.CharField(max_length=200)
	updated_at = models.DateTimeField(auto_now=True)
	created_at = models.DateTimeField(auto_now_add=True) 