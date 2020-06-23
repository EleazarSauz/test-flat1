from django.urls import path
from . import views

urlpatterns = [
    path('repo/', views.RepoViewSet.as_view()),
    path('repoDetails/<pk>/', views.RepoDetail.as_view()),
    path('repoInfoGit/<pk>/<dk>/', views.RepoInfoGit.as_view()),
    path('newPullRequest/', views.NewPullRequest.as_view()),
    path('updatePullRequest/<pk>', views.UpdatePullRequest.as_view()),
    path('listPullRequest/<pk>/', views.ListPullRequestView.as_view()),
]