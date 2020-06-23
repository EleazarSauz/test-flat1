from rest_framework import generics, mixins
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework.status import (
    HTTP_400_BAD_REQUEST,
    HTTP_201_CREATED,
    HTTP_500_INTERNAL_SERVER_ERROR
)
from git import Repo, refs
import os
from .functions import (
    CloneRepo, 
    CreateRepo, 
    ReadRepo,
    CreateCommit
)
from .models import Repo as RepoModel, PullRequest
from .serializers import RepoSerializer, RepoDetailSerializer, PullRequestSerializer


# Create your views here.
class RepoViewSet(generics.ListCreateAPIView):
    """
    colocar 'in_github' en false si ves esto en django rest framework,
    solo es true si el frontend valido que existe el repo en github
    """
    queryset = RepoModel.objects.all().order_by('id')
    serializer_class = RepoSerializer

    def post(self, request, *args, **kwargs):
        data=request.data
        serializer = RepoSerializer(data=request.data)
        if serializer.is_valid():
            try:
                serializer.save()
                if serializer.data['in_github']:
                    CloneRepo(serializer.data['id_repo'])
                else:
                    CreateRepo(serializer.data['id_repo'])
                return Response(serializer.data, status=HTTP_201_CREATED)
            except:
                return Response({"message": "Error al crear el repo"}, status=HTTP_400_BAD_REQUEST)
        return Response(serializer.errors, status=HTTP_400_BAD_REQUEST)

    def list(self, request):
        print('request list... ', request)
        queryset = self.get_queryset()
        serializer = RepoSerializer(queryset, many=True)
        return Response(serializer.data)


class ListPullRequestView(generics.ListAPIView):
    queryset = PullRequest.objects.all()
    serializer_class = PullRequestSerializer

    def get(self, request, pk, format=None):
        snippets = PullRequest.objects.filter(repo=pk)
        serializer = PullRequestSerializer(snippets, many=True)
        return Response(serializer.data)


class RepoDetail(mixins.RetrieveModelMixin, generics.GenericAPIView):
    queryset = RepoModel.objects.all()
    serializer_class = RepoDetailSerializer

    def get(self, request, *args, **kwargs):
        return self.retrieve(request, *args, **kwargs)


class RepoInfoGit(APIView):
    def get(self, request, pk, dk):
        return Response(ReadRepo(pk+'/'+dk))
       

class NewPullRequest(generics.CreateAPIView):
    serializer_class = PullRequestSerializer
    def post(self, request, *args, **kwargs):
        try:
            serializer = PullRequestSerializer(data=request.data)
            if serializer.is_valid():
                serializer.save()
                data=serializer.data
                return Response(serializer.data, status=HTTP_201_CREATED)
            return Response(serializer.errors, status=HTTP_400_BAD_REQUEST)
        except:
            return Response({"message": "Hubo conflictos al realizar el merge"}, status=HTTP_500_INTERNAL_SERVER_ERROR)


class UpdatePullRequest(generics.UpdateAPIView):
    serializer_class = PullRequestSerializer
    def put(self, request, pk, *args, **kwargs):
        try:
            pull_request = PullRequest.objects.get(pk=pk)
        except PullRequest.DoesNotExist:
            return Response({"message": "Error al editar pull request"}, status=HTTP_400_BAD_REQUEST)
        serializer = PullRequestSerializer(pull_request, data=request.data)
        if serializer.is_valid():
            serializer.save()
            data=serializer.data
            return Response(serializer.data, status=HTTP_201_CREATED)
        return Response(serializer.errors, status=HTTP_400_BAD_REQUEST)
