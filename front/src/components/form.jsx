import React, {useState} from 'react'
import { useForm } from "react-hook-form";
import { useLazyQuery } from '@apollo/react-hooks';

import {GET_PRs} from '../resources/graphql/queries'
import {getListRepo, postRepoToApi} from '../resources/fuctions'


const Form = ({setListBranch, formData, setFormData}) => {

    const [repo, setRepo] = useState(null);
    const [repo404, setRepo404] = useState(false);
    const [getRepo, { loading }] = useLazyQuery(GET_PRs, {
        onCompleted: data => {
            const {name, refs, owner, description} = data.repository
            console.log('dataRepo',data.repository)
            setRepo(data.repository)
            setListBranch(refs.nodes)
            postRepoToApi(name, owner.login, description)
        },
        onError: err => {
            console.log('err ', err)
            setRepo404(true)
        }
    });
    const { register, handleSubmit, errors } = useForm();
    const onSubmit = async data => {
        try {
            const apiGet=  await getListRepo() 
            console.log(apiGet)
            const dataRepo = await getRepo({ variables: formData })
            
            console.log('dataRepo ', dataRepo);
            // postRepoToApi()
        } catch (error) {
            
        }
    }
    
    if (loading) return(  
        <div className="text-center mt-5 pt-5">
            <div className="spinner-grow" style={{width: '8rem', height: '8rem'}} role="status">
                <span className="sr-only">Loading...</span>
            </div>
            <p className="mt-4">Buscando repo...</p>
        </div>
    )
  

    return (
        <div>
             <form onSubmit={handleSubmit(onSubmit)} className="form-signin" >
                <div className="text-center">
                    <h2>Buscando repo</h2>
                    <p>
                        Ingresa los campos del dueño y el nombre del repositorio <br/>
                    </p>
                </div>

                <div className="form-label-group">
                    <input type="text" name="owner" className="form-control" placeholder="Dueño del repo"
                    onChange={e=>setFormData({...formData, owner:e.target.value})}
                    ref={register({ required: true })} defaultValue={formData.owner}/>
                    <label htmlFor="inputEmail">Dueño del repo</label>
                {errors.owner && <span className="text-danger">Este campo es requerido</span>}
                </div>


                <div className="form-label-group">
                    <input type="text" name="name" className="form-control" placeholder="Nombre del repo" 
                    onChange={e=>setFormData({...formData, name:e.target.value})}
                    ref={register({ required: true })} defaultValue={formData.name}/>
                    <label htmlFor="inputPassword">Nombre del repo</label>
                {errors.name && <span className="text-danger">Este campo es requerido</span>}
                </div>


                <div className="text-center mt-4">
                    <div className="btn-group btn-group-lg">
                        <button className="btn btn-success" type="submit">Branch</button>
                        <button className="btn btn-primary" >Author</button>
                        <button className="btn btn-info" type="submit" >Commit</button>
                    </div> 
                <button className="btn btn-lg btn-outline-warning btn-block mt-3" type="submit">Pull Request</button>
                    <br/>
                    <code>
                        Por defecto esta: <br/> 
                        <a href="https://github.com/FlatDigital/fullstack-interview-test" rel="noopener noreferrer" target="_blank">
                            github.com/FlatDigital/fullstack-interview-test
                        </a> <br/>
                        pero puedes consultar cualquiera repo publico de GitHub
                        o crear un nuevo :D
                    </code>   
                </div>
            </form>
            

            {
                repo404 &&
                <div className="alert alert-dismissible alert-danger text-center">
                    <button type="button" className="close" onClick={()=>setRepo404(false)}>&times;</button>
                    <strong>Repositorio no econtrado</strong> Verifica los datos o ingresa un nuevo nuevo
                </div>
            }

            {
                repo &&
                <div className="alert alert-dismissible alert-success text-center">
                    <button type="button" className="close" onClick={()=>setRepo404(false)}>&times;</button>
                    <strong>{repo.name}</strong> {repo.description}
                </div>
            }
            
        </div>
    )
}

export default Form