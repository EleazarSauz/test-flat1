from django.db import models

# Create your models here.
class Repo(models.Model):
    id_repo= models.CharField(max_length=160, unique=True, blank=False, null=False)
    name = models.CharField('Name Repo', max_length=80)
    owner = models.CharField('Creator Repo', max_length=80)
    description = models.TextField(blank=True, null=True)
    
    in_github = models.BooleanField('Is in Github', default=False)
    
class PullRequest(models.Model):
    TYPE_STATUS=(
        ('O', 'Open'),
        ('C', 'Close'),
        ('M', 'Merged')
    )
    BRANCH_OPTIONS=(
        ('B', 'base'),
        ('C', 'compare') 
    )
    author = models.CharField('Author Repo', max_length=60)
    title = models.CharField('Title PR', max_length=80)
    description = models.TextField(blank=True, null=True)
    status = models.CharField(max_length=1, choices=TYPE_STATUS)
    repo = models.ForeignKey('Repo', on_delete=models.CASCADE, related_name='getHorario')
    branch = models.CharField(max_length=1, choices=BRANCH_OPTIONS, default='B')