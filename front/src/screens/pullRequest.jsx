import React, {useState, useEffect, useRef}from 'react'

import { useForm } from "react-hook-form";
import {getListPullRequest, postPullRequest, editPullRequest} from '../resources/fuctions'
import AlertInfo from '../components/alertInfo'

const CreatePullRequest = ({dataGitApi}) => {
    const [arrayPullRequest, setArrayPullRequest] = useState([])
    const [fromPR, setFormPR] = useState(null)
    const { register, handleSubmit, errors } = useForm();
    const refFromPR = useRef(null);

    useEffect(() =>{
        if (dataGitApi) {
            setFormPR({
                title: "",
                author: "",
                description: "",
                status: "O",
                branch: "B",
                repo: dataGitApi.id
            })
            getListPullRequest(dataGitApi.id)
            .then(ok => {
                setArrayPullRequest(ok)
            })
            .catch(err => console.log(err))
        }

    }, [dataGitApi])

    const onSubmit = async data => {

        try {
            const resposePost = await postPullRequest(fromPR)
        
            console.log('repPost', resposePost)
        
            const resposeGet =  await  getListPullRequest(dataGitApi.id)
        
            setArrayPullRequest(resposeGet)
            refFromPR.current.reset()
            alert('Pull Request creado con exito :)')
            
        } catch (error) {
            alert(JSON.stringify(error))
        }
    }

    const closePullRequest = async (objPullRequest) => {
        try {
            objPullRequest.status = 'C'

            await editPullRequest(objPullRequest, objPullRequest.id)
            
            const getArrayPullRequest = await getListPullRequest(dataGitApi.id)

            setArrayPullRequest(getArrayPullRequest)
            
            alert('Pull Request cerrado con exito :)')
        } catch (error) {
            alert(JSON.stringify(error))
        }

    }


    if(dataGitApi === null) return <AlertInfo/>

    return (
        <div className="container mb-5 pb-5 animate__animated animate__fadeIn">
            <div className="text-center pt-3">
                <h2>Pull Request</h2>
                <p className="lead">
                    Realiza un Pull Request y consulta el historial del repo que seleccionaste
                </p>
            </div>

            <div className="row">
                
                <div className="col-md-7">
                <h4 className="mb-3">Crea un nuevo Pull Request</h4>
                <form className="needs-validation" ref={refFromPR}
                onSubmit={handleSubmit(onSubmit)}>
                    
                    <div className="row">
                        <div className="col-md-6 mb-3">
                        <label>Title</label>
                            <input type="text" className="form-control" placeholder="Titulo"
                            onChange={e=>setFormPR({...fromPR, title:e.target.value})}
                            ref={register({ required: true })} name="title"/>
                            {errors.title && <span className="text-danger">Este campo es requerido</span>}
                        </div>

                        <div className="col-md-6 mb-3">
                            <label>Author</label>
                            <input type="text" className="form-control" placeholder="" 
                            onChange={e=>setFormPR({...fromPR, author:e.target.value})}
                            ref={register({ required: true })}name="author"/>
                            {errors.author && <span className="text-danger">Este campo es requerido</span>}
                        </div>
                    </div>

                    <div className="mb-3">
                        <label>Description <span className="text-muted">(Optional)</span></label>
                        <textarea className="form-control" placeholder="Escribe algún comentario :)"
                        onChange={e=>setFormPR({...fromPR, description:e.target.value})}
                        name="description" rows="6" />
                        {errors.description && <span className="text-danger">Este campo es requerido</span>}
                    </div>

                    
                    <div className="row">
                        <div className="col-md-4 col-6 mb-3">
                            <label>Status</label>
                            <select className="custom-select d-block w-100" id="country" 
                            onChange={e=>setFormPR({...fromPR, status:e.target.value})}
                            ref={register({ required: true })} name="status">
                                <option value="O">Open</option>
                                <option value="C">Close</option>
                                <option value="M">Merged</option>
                            </select>
                        </div>

                        <div className="col-md-4 col-6 mb-3">
                            <label>Branch</label>
                            <select className="custom-select d-block w-100" id="country" 
                            onChange={e=>setFormPR({...fromPR, branch:e.target.value})}
                            ref={register({ required: true })} name="branch">
                                <option value="B">base</option>
                                <option value="C">compare</option>
                            </select>
                        </div>
                        
                        <div className="col-md-4 my-4 text-center">
                            <button className="btn btn-outline-success btn-lg" type="submit">
                                Crear Pull Request
                            </button>
                        </div>
                    </div>

                    <hr className="mb-4"/>
                </form>
                </div>
                
                <div className="col-md-5 mb-4">
                <h4 className="d-flex justify-content-between align-items-center mb-3">
                    <span className="text-muted">Historial de Pull request</span>
                    <span className="badge badge-secondary badge-pill">{arrayPullRequest.length}</span>
                </h4>
                <ul className="list-group mb-3">
                    {
                        arrayPullRequest.map((i,index)=>(
                            <div key={index}>
                        <li className="list-group-item d-flex justify-content-between lh-condensed">
                            <div>
                                <h6 className="my-0">{i.title}</h6>
                                <small className="text-muted">{i.description}</small>
                            </div>
                            <StatusComponent status={i.status}/>
                        </li>
                        {
                            i.status === 'O' &&
                            <button className="btn btn-outline-danger btn-block mb-2" onClick={() => closePullRequest(i)}>
                                Close Pull Request
                            </button>
                        }
                        </div>
                        ))
                    }
                </ul>

                </div>
            </div>
        </div>
    )
}


const StatusComponent = ({status}) => {
    switch(status) {
        case 'O':
            return <div>
                <span className="badge badge-pill badge-success">Open</span>
            </div>
        case 'C':
            return <div>
                <span className="badge badge-pill badge-danger">Close</span>
                    
            </div>
        case 'M':
            return <div>
                <span className="badge badge-pill badge-warning">Merged</span>
            </div>
        default:
            return null
      }
}


export default CreatePullRequest
