from django.db import models

# Create your models here.
class FootballCard(models.Model):
    name = models.CharField(max_length=100)
    team = models.CharField(max_length=100)
    position = models.CharField(max_length=100)
    brand = models.CharField(max_length=100)
    program = models.CharField(max_length=100)
    year = models.CharField(max_length=100)
    nationalteam = models.CharField(max_length=100)
    league = models.CharField(max_length=100)
    image = models.ImageField(upload_to='images/', default='images/None/no-img.jpg')

    def __str__(self):
        return self.name