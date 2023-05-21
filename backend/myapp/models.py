from django.db import models
from django.contrib.auth.models import User
from django.utils import timezone
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
    created_date = models.DateTimeField(default=timezone.now)
    
    def __str__(self):
        return self.name


class Request(models.Model):
    name = models.CharField(max_length=100)
    team = models.CharField(max_length=100)
    position = models.CharField(max_length=100)
    brand = models.CharField(max_length=100)
    program = models.CharField(max_length=100)
    year = models.CharField(max_length=100)
    nationalteam = models.CharField(max_length=100)
    league = models.CharField(max_length=100)
    image = models.ImageField(upload_to='images/', default='images/None/no-img.jpg')
    created_date = models.DateTimeField(default=timezone.now)
    is_accepted = models.BooleanField(default=False)

    def save(self, *args, **kwargs):
        super().save(*args, **kwargs)
        if self.is_accepted:
            football_card = FootballCard.objects.create(
                name=self.name,
                team=self.team,
                position=self.position,
                brand=self.brand,
                program=self.program,
                year=self.year,
                nationalteam=self.nationalteam,
                league=self.league,
                image=self.image,
                created_date=self.created_date,
                # Add more fields as needed
            )
            # You can perform additional actions or validations on the created football_card object if required
            football_card.save()

    def __str__(self):
        return self.name



class Favorite(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    card = models.ForeignKey(FootballCard, on_delete=models.CASCADE)
    created_date = models.DateTimeField(default=timezone.now)

    def __str__(self):
        return f"{self.user.username}: {self.card.name}"



class UserCollection(models.Model):
    name = models.CharField(max_length=100)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    created_date = models.DateTimeField(default=timezone.now)

    def __str__(self):
        return self.name
    

class UserCollectionItem(models.Model):
    user_collection = models.ForeignKey(UserCollection, on_delete=models.CASCADE)
    card = models.ForeignKey(FootballCard, on_delete=models.CASCADE)
    created_date = models.DateTimeField(default=timezone.now)


    def __str__(self):
        return f"{self.user_collection.name}: {self.card.name}"

