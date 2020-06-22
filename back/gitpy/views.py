from django.shortcuts import render
from django.http import HttpResponse, Http404
from rest_framework import generics, mixins
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import viewsets, authentication, permissions
from rest_framework.decorators import api_view
from rest_framework.parsers import JSONParser
from rest_framework.status import (
    HTTP_400_BAD_REQUEST,
    HTTP_404_NOT_FOUND,
    HTTP_200_OK,
    HTTP_201_CREATED,
    HTTP_204_NO_CONTENT
)
from git import Repo, refs
import os
from .functions import (
    suma, 
    CloneRepo, 
    CreateRepo, 
    ReadRepo, 
    createBranch
)
from .models import Repo as RepoModel, PullRequest
from .serializers import RepoSerializer,RepoDetailSerializer, PullRequestSerializer


# Create your views here.
@api_view(['GET', 'POST'])
def index(request):
    """
    refs.head.HEAD(repo, path='HEAD')
    /bare-repo
    /repositories/git1/.git
    #Crear git en en directorio especificado 
    bare_repo = Repo.init(os.path.join(rw_dir, '.git'), bare=True)
    assert bare_repo.bare
    """
    if request.method == 'POST':
        uri = request.data['url']
        name_repo = request.data['name_repo']
        print ('hi info :)', uri, name_repo)

        return Response({"message": "Got some data!", "data": request.data})

    return Response({"message": "Got some data!", "data": createBranch('EleazarSauz/testArduino')})



class RepoViewSet(generics.ListCreateAPIView):
    """
    colocar in_github en falso si ves esto en django rest framework
    solo es true si el frontend valido que existe el repo en github
    """
    queryset = RepoModel.objects.all().order_by('id')
    serializer_class = RepoSerializer

    def post(self, request, *args, **kwargs):
        data=request.data
        #data['id_repo']=request.data['owner']+'/'+request.data['name']
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
        # Note the use of `get_queryset()` instead of `self.queryset`
        print('request list... ', request)
        queryset = self.get_queryset()
        serializer = RepoSerializer(queryset, many=True)
        return Response(serializer.data)


class PullRequestViewSet(generics.ListCreateAPIView):
    queryset = PullRequest.objects.all()
    serializer_class = PullRequestSerializer
    def post(self, request, pk, *args, **kwargs):
        #data=request.data
        #data['id_repo']=request.data['owner']+'/'+request.data['name']
        serializer = PullRequestSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=HTTP_201_CREATED)
        return Response(serializer.errors, status=HTTP_400_BAD_REQUEST)

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
        try:
            return Response(ReadRepo(pk+'/'+dk))
        except:
            raise Http404