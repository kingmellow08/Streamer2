from django.db import models

# Create your models here.


class Movie(models.Model):
	title = models.TextField()
	status = models.CharField(max_length=200)
	description = models.TextField()
	rated = models.CharField(max_length=200)
	score = models.FloatField()
	trailer = models.TextField()
	released_date = models.DateField()
	run_time = models.TimeField(auto_now=False)
	budget = models.FloatField()
	revenue = models.FloatField()
	image = models.TextField()
	bg_image = models.TextField()

	updated_at = models.DateTimeField(auto_now=True)
	created_at = models.DateTimeField(auto_now_add=True)

class Cast(models.Model):
	first_name = models.CharField(max_length=200)
	last_name = models.CharField(max_length=200)
	gender = models.CharField(max_length=10)
	birth_place = models.TextField()
	birthday = models.DateField()
	bio = models.TextField()
	website = models.TextField()
	bg_image = models.TextField()
	also_known_as = models.TextField()

	updated_at = models.DateTimeField(auto_now=True)
	created_at = models.DateTimeField(auto_now_add=True)

class CastMedia(models.Model):
	media_id = models.BigIntegerField()
	cast_id = models.BigIntegerField()
	role_id = models.BigIntegerField()
	media_type = models.CharField(max_length=10)

	updated_at = models.DateTimeField(auto_now=True)
	created_at = models.DateTimeField(auto_now_add=True)

class Role(models.Model):
	role = models.CharField(max_length=200)
	updated_at = models.DateTimeField(auto_now=True)
	created_at = models.DateTimeField(auto_now_add=True)

class Genre(models.Model):
	genre = models.CharField(max_length=200)
	updated_at = models.DateTimeField(auto_now=True)
	created_at = models.DateTimeField(auto_now_add=True) 

class GenreMedia(models.Model):
	media_id = models.BigIntegerField()
	genre_id = models.BigIntegerField()
	media_type = models.CharField(max_length=10)

	updated_at = models.DateTimeField(auto_now=True)
	created_at = models.DateTimeField(auto_now_add=True)


class Keyword(models.Model):
	keyword = models.CharField(max_length=200)
	updated_at = models.DateTimeField(auto_now=True)
	created_at = models.DateTimeField(auto_now_add=True) 

class KeywordMedia(models.Model):
	media_id = models.BigIntegerField()
	keyword_id = models.BigIntegerField()
	media_type = models.CharField(max_length=10)
	
	updated_at = models.DateTimeField(auto_now=True)
	created_at = models.DateTimeField(auto_now_add=True)