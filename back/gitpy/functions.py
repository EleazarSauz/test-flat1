from rest_framework.response import Response
from rest_framework import status
from django.db import transaction
from git import Repo, Actor
import json
import os
from .models import PullRequest


repo_dir_git = os.path.dirname(os.path.dirname(os.path.abspath(__file__))) + '/repositories/'

def CloneRepo(id_repo):
    uri = 'http://github.com/' + id_repo
    clone_repo = Repo.clone_from(uri, repo_dir_git + id_repo)

    clone_repo.create_head('base')
    clone_repo.create_head('compare')


def CreateRepo(id_repo):
    repo_dir = repo_dir_git+id_repo
    new_repo = Repo.init(repo_dir)
    
    committer = Actor('GitPython', '')
    file_name = os.path.join(repo_dir, 'README.md')
    open(file_name, 'wb').close()
    new_repo.index.add([file_name])
    new_repo.index.commit("initial commit", committer=committer, author=committer)

    new_repo.create_head('base')
    new_repo.create_head('compare')



def ParseListCommit(commits):
    list_commit=[]
    for i in commits:
        list_commit.append({
            'message':i.message,
            'timestamp':i.committed_date,
            'author':i.author.name,
            'committer': i.committer.name,
        })
    return list_commit
        

def ReadRepo(id_repo):
    repo = Repo(repo_dir_git+id_repo+'/.git')
 
    list_branch=[]
    repo_heads=repo.heads
    for j in repo_heads:
        list_branch.append({
            'name': j.name,
            'abspath': j.abspath,
            'author': j.path,
            'commits': ParseListCommit(repo.iter_commits(j.name))
        })
    obj_repo = {
        'untracked_files':repo.untracked_files,
        'is_dirty': repo.is_dirty(),
        'repo.index.diff(None)':repo.index.diff(),
        'list_branch': list_branch,
    }

    return obj_repo


def CreateCommit(id_repo, message, actor, title, branch_type, is_merge):
    repo_dir = repo_dir_git+id_repo
    repo = Repo(repo_dir+'/.git')
    author = Actor(actor, '')
    committer = Actor('GitPython', '')
    if branch_type == 'C':
        branch='compare'
    else:
        branch='base'
    repo.git.checkout(branch)

    new_file_path = os.path.join(repo_dir, title+'.txt')
    open(new_file_path, 'w').close()
    repo.index.add(repo.untracked_files)

    repo.index.commit(message, author=author, committer=committer)

    if is_merge:
        repo.git.checkout('master')
        repo.git.merge(branch)
    return ReadRepo(id_repo)