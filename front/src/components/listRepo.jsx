import React, {useState, useEffect} from 'react'
import {getListRepo} from '../resources/fuctions'

const ListRepo = ({listBranch}) => {
    const [arrayRepo, setArrayRepo] = useState([])

    useEffect(() => {
        getListRepo().then(data=>{
            setArrayRepo(data)
        })
    },[])
    return (
        <div className="container table-responsive">
            <table className="table table-hover">
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
                arrayRepo.map((i,index)=>(
                    <tr key={index} className={`table-${index % 2===0 ? 'primary' : 'secondary'}`}>
                      <td>{i.id}</td>
                      <td>{i.name}</td>
                      <td>{i.owner}</td>
                      <td>{i.description}</td>
                      <th scope="row"> <i className={`fab fa-2x ${i.in_github? 'fa-github' : 'fa-git-alt'}`}></i>  </th>
                    </tr>

                ))
            }
                </tbody>
            </table> 
        </div>
    )
}

export default ListRepo
