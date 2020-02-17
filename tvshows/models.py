from django.db import models

# Create your models here.

class TvShow(models.Model):
	title = models.TextField()
	status = models.CharField(max_length=200)
	description = models.TextField()
	rated = models.CharField(max_length=200)
	score = models.FloatField()
	network = models.CharField(max_length=200)
	released_date = models.CharField(max_length=200)
	show_type = models.CharField(max_length=200)
	run_time = models.TimeField(auto_now=False)
	image = models.TextField()
	bg_image = models.TextField()

	updated_at = models.DateTimeField(auto_now=True)
	created_at = models.DateTimeField(auto_now_add=True)

