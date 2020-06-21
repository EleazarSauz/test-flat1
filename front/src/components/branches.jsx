import React from 'react'

const Branches = ({listBranch}) => {
    return (
        <div className="container table-responsive">
            <table className="table table-hover">
                <thead>
                    <tr>
                    <th scope="col"></th>
                    <th scope="col">Nombre de la rama</th>
                    <th scope="col">Column heading</th>
                    </tr>
                </thead>
                <tbody>
                  
            {
                listBranch.map((i,index)=>(
                    <tr key={index} className={`table-${index % 2===0 ? 'primary' : 'secondary'}`}>
                      <th scope="row"> <i className={`fas " ${i.name === 'master' ? 'fa-crown' : 'fa-code-branch'}`}></i>  </th>
                      <td>{i.name}</td>
                      <td>{index % 2===0 ? 'primary' : 'secondary'}</td>
                    </tr>

                ))
            }
                </tbody>
            </table> 
        </div>
    )
}

export default Branches
