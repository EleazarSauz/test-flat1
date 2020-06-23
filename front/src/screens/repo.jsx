import React, {useState} from 'react'
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { useLazyQuery } from '@apollo/react-hooks';

import Loading from '../components/loading'
import {GET_GITHUB_DATA} from '../resources/graphql/queries'
import {getListRepoApi, postRepoToApi, getRepoGitpy} from '../resources/fuctions'


const Repo = ({dataGitApi, setDataGitApi, arrayRepo, formDataRepo,setFormDataRepo, setArrayRepo, setDataGitHub, dataGitHub}) => {
    let history = useHistory();
    const [repoFound, setRepoFound] = useState(null);
    const {register, handleSubmit, errors} = useForm();
    
    const [getRepoOfGitHub, { loading }] = useLazyQuery(GET_GITHUB_DATA, {
        onCompleted: data => {
            setDataGitHub(data.repository)
            setRepoFound(true)
        },
        onError: err => {
            console.log('err ', err)
            setRepoFound(false)
        }
    });
    
    const searchRepo = async () => {
        try {
            await getRepoOfGitHub({ variables: formDataRepo })
        } catch (error) {
            
        }
    }

    const createRepo = async () => {
        try {
            const dataPostRepo = await postRepoToApi(
                formDataRepo.name, 
                formDataRepo.owner, 
                'Repo creado con gitpython :)', false
            )
            const getDataGitApi = await getRepoGitpy(dataPostRepo.id)
            setDataGitApi(getDataGitApi)
            const getArrayRepo =  await getListRepoApi() 
            setArrayRepo(getArrayRepo)
            alert('Repo creado con éxito :)')
            history.push('/infoGit')

        } catch (error) {
            console.log(error)
            alert('Error D:' + JSON.stringify(error))
        }
    }

    const cloneRepo = async () => {
        try {
            await getRepoOfGitHub({ variables: formDataRepo })

            if (repoFound) {
                const dataPostRepo = await postRepoToApi(
                    dataGitHub.name, 
                    dataGitHub.owner.login, 
                    dataGitHub.description,
                    true
                )
                const getDataGitApi = await getRepoGitpy(dataPostRepo.id)
                setDataGitApi(getDataGitApi)

                const getArrayRepo = await getListRepoApi() 
                setArrayRepo(getArrayRepo)
                alert('Repo clonado con éxito :)')
                history.push('/infoGit')
            }
        } catch (error) {
            console.log(error)
            alert('Error D:' + JSON.stringify(error))
        }
    }
    
    const selectRepo = (id) => {
        getRepoGitpy( id ).then(data => {
            setDataGitApi(data)
            history.push('/infoGit')
        })
        .catch( err => alert(JSON.stringify(err)))
    }
    
    const colorRowTable = (index, id_repo) => {
        if (dataGitApi && id_repo === dataGitApi.id_repo ){
            return 'success'
        } else if (index % 2===0 ) {
            return 'primary'
        } else {
            return 'secondary'
        }
    }
    
    if (loading) return<Loading/>

    return (
        <div className="animate__animated animate__fadeIn" id="repo">
             <div>
                <form onSubmit={handleSubmit(cloneRepo)} className="form-signin" >
                    <div className="text-center">
                        <p>
                            Ingresa los campos del dueño y el nombre del repositorio <br/>
                        </p>
                    </div>

                    <div className="form-label-group">
                        <input type="text" name="owner" className="form-control" placeholder="Dueño del repo"
                        onChange={e=>setFormDataRepo({...formDataRepo, owner:e.target.value})}
                        ref={register({ required: true })} defaultValue={formDataRepo.owner}/>
                        <label htmlFor="inputEmail">Dueño del repo</label>
                    {errors.owner && <span className="text-danger">Este campo es requerido</span>}
                    </div>


                    <div className="form-label-group">
                        <input type="text" name="name" className="form-control" placeholder="Nombre del repo" 
                        onChange={e=>setFormDataRepo({...formDataRepo, name:e.target.value})}
                        ref={register({ required: true })} defaultValue={formDataRepo.name}/>
                        <label htmlFor="inputPassword">Nombre del repo</label>
                    {errors.name && <span className="text-danger">Este campo es requerido</span>}
                    </div>
                { 
                    repoFound != null && ( repoFound  ?
                    <div className="alert alert-dismissible alert-success text-center">
                        <button type="button" className="close" data-dismiss="alert">&times;</button>
                        Repositorio econtrado :D <br/>
                        <strong>{dataGitHub.name}</strong> <br/>
                        {dataGitHub.description}
                    </div> : <div className="alert alert-dismissible alert-danger text-center">
                        <button type="button" className="close" data-dismiss="alert">&times;</button>
                        <strong>Repositorio no econtrado</strong> <br/> Verifica los datos o ingresa uno nuevo
                    </div> )
                }
                    <div className="text-center mt-4">
                        <div className="btn-group btn-group-lg">
                            <button className="btn btn-success" type="button" onClick={searchRepo}>Buscar</button>
                            <button className="btn btn-primary" type="button" onClick={createRepo}>Crear</button>
                            {repoFound &&
                            <button className="btn btn-info" type="submit" >Clonar</button>
                            }
                        </div> 
                        <br/>
                        <code>
                            Por defecto esta: <br/> 
                            <a href="https://github.com/FlatDigital/fullstack-interview-test" rel="noopener noreferrer" target="_blank">
                                github.com/FlatDigital/fullstack-interview-test
                            </a> <br/>
                            pero puedes consultar cualquiera repo publico de GitHub
                            o crear un nuevo cambiando los datos del formulario :D
                        </code>   
                    </div>
                </form>
            </div>

            <div className="container table-responsive">
                <h4 className="text-center">
                    O puedes selecionar uno de los reposotrios que se han guardado
                </h4>
                <table className="table table-hover mt-3">
                    <thead>
                        <tr>
                        <th scope="col">id</th>
                        <th scope="col">Nombre</th>
                        <th scope="col">Dueño</th>
                        <th scope="col">Descripción</th>
                        <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody>
                    {
                    arrayRepo.map((i,index) => (
                        <tr key={index} className={`table-${colorRowTable(index, i.id_repo)}`}
                            onClick={()=> selectRepo(i.id)}>
                        <td>{i.id}</td>
                        <td>{i.name}</td>
                        <td>{i.owner}</td>
                        <td>{i.description}</td>
                        <td><i className={`fab fa-2x fa-${i.in_github? 'github' : 'git-alt'}`}></i></td>
                        </tr>
                    ))
                    }
                    </tbody>
                </table> 
            </div>
        </div>
    )
}

export default Repo
