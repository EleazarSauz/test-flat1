from django.urls import path

from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('repo/', views.RepoViewSet.as_view(), name="repo_view"),
    path('repoInfoGit/<pk>/<dk>/', views.RepoInfoGit.as_view(), name="repo_details"),
    path('PRsOfRepo/<pk>/', views.PullRequestViewSet.as_view()),
    path('repoDetails/<pk>/', views.RepoDetail.as_view())
]