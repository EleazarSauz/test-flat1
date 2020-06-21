import React, {useState, useEffect}from 'react'

import { useForm } from "react-hook-form";
import {getListPullReuqest, postPullReuqest} from '../resources/fuctions'

const CreatePullRequest = ({dataRepo}) => {
    const [arrayPullRequest, setArrayPullRequest] = useState([])
    const [fromPR, setFormPR] = useState({
        title: "",
        author: "",
        description: "",
        status: "O",
        repo: dataRepo.id
    })
    const { register, handleSubmit, errors } = useForm();

    useEffect(() =>{
        getListPullReuqest(dataRepo.id).then(ok=>setArrayPullRequest(ok)).catch(err =>console.log('err ', err ))
        console.log(fromPR)

    },[])

    const onSubmit = async data => {
        try {
            const resposePost = await postPullReuqest(fromPR)
            
            console.log('repPost', resposePost)

            const resposeGet =  await  getListPullReuqest(dataRepo.id)

            setArrayPullRequest(resposeGet)

            console.log(fromPR)
            
        } catch (error) {
            console.log('err', error)
        }
    }

    return (
        <div>
            <div className="container mb-5 pb-5">
                <div className="text-center pt-3">
                    <h2>Pull Request</h2>
                    <p className="lead">
                        ....
                    </p>
                </div>

                <div className="row">
                    
                    <div className="col-md-7">
                    <h4 className="mb-3">Crea un nuevo Pull Request</h4>
                    <form className="needs-validation"
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
                            <div className="col-md-5 mb-3">
                                <label>Status</label>
                                <select className="custom-select d-block w-100" id="country" 
                                onChange={e=>setFormPR({...fromPR, status:e.target.value})}
                                ref={register({ required: true })} name="status">
                                    <option value="O">Open</option>
                                    <option value="C">Close</option>
                                    <option value="M">Merged</option>
                                </select>
                                {errors.status && <span className="text-danger">Este campo es requerido</span>}
                            </div>
                            
                            <div className="col-md-7 my-4 text-center">
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
                            <li key={index} className="list-group-item d-flex justify-content-between lh-condensed">
                                <div>
                                    <h6 className="my-0">{i.title}</h6>
                                    <small className="text-muted">{i.description}</small>
                                </div>

                                

                                <StatusComponent status={i.status}/>
                                
                            </li>
                            ))
                        }
                    </ul>

                    </div>
                    
                </div>

            </div>
        </div>
    )
}


const StatusComponent = ({status}) => {
    if (status === 'O') {
        return <div>
            <span className="badge badge-pill badge-success">Open</span>
            {/* <button type="button" className="btn btn-outline-success">Success</button> */}

        </div>
    } else if (status === 'C') {
        return <div>
            <span className="badge badge-pill badge-danger">Close</span>
                
        </div>
    } else {
        return <div>
            <span className="badge badge-pill badge-warning">Merged </span>
        </div>
    }
}


export default CreatePullRequest
