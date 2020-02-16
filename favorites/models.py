from django.db import models

# Create your models here.


class Favorites(model.Model)
	favorite_id = models.IntergerField()
	media_id=models.IntergerField()
	media_type=models.CharField(max_length=200)
	created_at=models.DateTimeField(auto_now_add=True)
	updated_at=models.DateTimeField(auto_now=True)
