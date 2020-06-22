from rest_framework.response import Response
from rest_framework import status
from django.db import transaction
from git import Repo, Actor
import json
import os

rw_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__))) + '/repositories/'

def ValidRepo(func):
    def funcion_validator(*args, **kwargs):
        print('Antes de la ejecución de la función a decorar', *args)
        if args[0] == 'mirepo': 
            return func(*args, **kwargs)
        else:
            return Response({
                'message':'El repositorio ya ha sido clonado D:'},
                status=status.HTTP_400_BAD_REQUEST)
            print('No se ejecuto')
        print('Después de la ejecución de la función a decorar')    

    return funcion_validator


def CloneRepo(id_repo):
    uri = 'http://github.com/'+id_repo
    Repo.clone_from(uri, rw_dir+id_repo)
    ##buscar en la base de datos
    print ('hi repo :) ', uri)


def funcion_a(funcion_b):
    def funcion_c(*args, **kwargs):
        print('Antes de la ejecución de la función a decorar', *args)
        if args[0] == 1: 
            result = funcion_b(*args, **kwargs)
        else:
            print('No se ejecuto')
        print('Después de la ejecución de la función a decorar')    

        return result

    return funcion_c

@funcion_a
def suma(a):
    print ('mi valor es ', a)
    return a


def CreateRepo(id_repo):
    """
    #Pasar un repositorio valido al objeto Repo()
    repo = Repo(rw_dir+'/repositories/git1/.git')
    for i in repo.commit('master').parents:
        print('repo...', i.message)
    refs.head.HEAD(repo, path='HEAD')
    /bare-repo
    /repositories/git1/.git
    """
    #Crear git en en directorio especificado 
    bare_repo = Repo.init(rw_dir + id_repo)


def ReadRepo(id_repo):
    
    #Pasar un repositorio valido al objeto Repo()
    repo = Repo(rw_dir+id_repo+'/.git')
    list_commit=[]
    for i in repo.iter_commits():
        #print('repo...', i)
        def get_data(tree):
            trees = tree.trees
            blobs=tree.blobs
            list_item=[]
            if len(trees) > 0:
                list_item.append(trees[0].name)
                for i in trees:
                    #d_tree={i.name:[]}
                    d_tree={i.name:get_data(i)}
                    list_item.append(d_tree)
                if len(blobs)>0:
                    for i in blobs:
                        list_item.append(i.name)


                    
                    #items += get_data(key)
            return list_item

        list_commit.append({
            'message':i.message,
            'timestamp':i.committed_date,
            'author':i.author.name,
            'committer': i.committer.name,
            'tree': get_data(i.tree)
        })

            
        """
        assert len(i.tree.trees) > 0          # trees are subdirectories
        assert len(i.tree.blobs) > 0          # blobs are files
        assert len(i.tree.blobs) + len(i.tree.trees) == len(tree)
        """
    #list_commit=json.dumps(list_commit)
    #print('list_commit', list_commit)
    for item in repo.untracked_files:
        print ('files', item)
    
    list_branch=[]
    repo_heads=repo.heads
    for j in repo_heads:
        list_commit2=[]
        for k in repo.iter_commits(j.name, max_count=50):
            list_commit2.append({
            'message':k.message,
            'timestamp':k.committed_date,
            'author':k.author.name,
            'committer': k.committer.name,
            'tree': len(list(k.tree.traverse()))
        })
        list_branch.append({
            'name':j.name,
            'abspath': j.abspath,
            'author':j.path,
            'commits': list_commit2
        })
        print('repo_heads..', str(j))
    """
    for j in repo.heads().IterableList:
        print('repo...', i)
        list_branch.append(i.message)
    """
    #list_commit=json.dumps(list_commit)
    return {'commits':list_commit, 'branches': list_branch}
    

def createBranch(id_repo):
    repo = Repo(rw_dir+id_repo+'/.git')
    demoRepo=rw_dir+'ele/demo2'

    print ('create branch ', repo)
    """
    file_name = os.path.join(demoRepo, 'file3.txt')

    r = demoRepo + '.git'
    # This function just creates an empty file ...
    open(file_name, 'wb').close()

    r.index.add([file_name])
    r.index.commit("initial commit :)")

    repo.create_head('branch1')
    """
    # new_branch = repo.create_head('branch-gitpy1')
    # new_branch.commit = 'un commit :)' 
    list_branch=[]
    repo_heads=repo.heads
    for j in repo_heads:
        list_branch.append({
            'name':j.name,
            'abspath': j.abspath,
            'path':j.path
        })
    index_blobs=repo.index

    objRepo= {
        'untracked_files':repo.untracked_files,
        'working_tree_dir': repo.working_tree_dir,
        'is_dirty': repo.is_dirty(),
        'heads': list_branch,
        'repo.index': 'json.dumps(index_blobs.entries.items())'
    }
    # repo.index.add(['README.md'])
    return objRepo