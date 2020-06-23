import React from 'react'
import AlertInfo from '../components/alertInfo'

const Info = ({dataGitApi}) => {
    if (dataGitApi === null) return <AlertInfo/>
    return (
        <div className="container animate__animated animate__fadeIn">
            <div className="text-center py-3">
                <h2>Detalles del repo</h2>
                <p>
                Branchs & commits <br/>
                </p>
            </div>

            <div className="accordion" id="accordionGit">
            {
                dataGitApi.git.list_branch.length > 0 
                ?
                dataGitApi.git.list_branch.map((i,index) => (
                <div className="card" key={index}>
                    <div className="card-header d-flex justify-content-between" id="headingOne"
                    data-toggle="collapse" data-target={"#collapse"+index} aria-expanded="true" 
                    aria-controls={"collapse"+index}>
                        <h4 className="mb-0">
                            Branch: {i.name} 
                        </h4>
                        <div className="m-2">
                            <i className={`fas fa-2x" ${i.name === 'master' ? 'fa-crown' : 'fa-code-branch'}`}></i>
                        </div>
                    </div>

                    <div id={"collapse"+index} className="collapse" aria-labelledby="headingOne" data-parent="#accordionGit">
                        <div className="card-body">
                            <h4 className="text-center">Commits</h4>
                        </div>

                        <div className="table-responsive"  >
                            <table className="table table-hover">
                                <thead>
                                    <tr>
                                        <th>timestamp</th>
                                        <td>message</td>
                                        <td>author</td>
                                    </tr>
                                </thead>
                                {
                                    i.commits.map((j,index2)=>(
                                    <tbody key={index2}>
                                        <tr key={index2} className={`table-${index2 % 2===0 ? 'primary' : 'secondary'}`}>
                                            <th scope="col">{new Date(j.timestamp).toLocaleString()}</th>
                                            <th scope="col">{j.message}</th>
                                            <th scope="col">{j.author}</th>
                                        </tr>
                                    </tbody>
                                    ))
                                }
                            </table>
                        </div>
                    </div>
                </div>
                ))
                :
                <h4 className="text-center text-warning">Repo sin ramas ni commits :(</h4>
            }
            </div>
        </div>
    )
}

export default Info
