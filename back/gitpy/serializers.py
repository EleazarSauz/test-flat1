from rest_framework import serializers
from .models import Repo, PullRequest
from .functions import CreateCommit

class PullRequestSerializer(serializers.ModelSerializer):
    class Meta:
        model=PullRequest
        fields=(
            'id',
            'title',
            'author',
            'description',
            'status',
            'repo',
            'branch'
        )
    def to_internal_value(self, data):
        data_repo = Repo.objects.get(pk=data.get('repo'))
        is_merge=False
        if data.get('status') == "M":
            is_merge=True

        CreateCommit(
            data_repo.id_repo, 
            data.get('description'), 
            data.get('author'),
            data.get('title'),
            data.get('branch'),
            is_merge
        )
        return {
            'id': data.get('id'),
            'title': data.get('title'),
            'author': data.get('author'),
            'description': data.get('description'),
            'status': data.get('status'),
            'repo': data_repo,
            'branch': data.get('branch'),
        }



class RepoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Repo
        fields = (
            'id',
            'id_repo',
            'name',
            'owner',
            'description',
            'in_github'
        )

    def to_internal_value(self, data):
        name = data.get('name')
        owner = data.get('owner')
        in_github = data.get('in_github') 
        if not name:
            raise serializers.ValidationError({
                'name': 'This field is required.'
            })
        if not owner:
            raise serializers.ValidationError({
                'owner': 'This field is required.'
            })
        if in_github is None:
            in_github = False

        return {
            'id': data.get('id'),
            'id_repo': owner + '/' + name,
            'name': data.get('name'),
            'owner': data.get('owner'),
            'description': data.get('description'),
            'in_github': in_github,
        }


class RepoDetailSerializer(serializers.ModelSerializer):

    pullRequestList =  serializers.SerializerMethodField('getPullRequest')
    
    class Meta:
        model = Repo
        fields = (
            'id',
            'id_repo',
            'name',
            'owner',
            'description',
            'in_github',
            'pullRequestList'
        )
    
    def getPullRequest(self, instance):
        pullRequest = PullRequest.objects.filter(repo=instance.id)
        return PullRequestSerializer(pullRequest, many=True).data
    
