import React from 'react'
import { useHistory } from "react-router-dom";

const AlertInfo = () => {
    let history = useHistory() ;
    return (
        <div className="container my-5">
            <div className="jumbotron">
                <h2 className="display-6">Selecciona antes un repositorio</h2>
                <p className="lead">
                    Para poder realizar cualquier operacion antes debes de seleccionar, clonar o crear un repositorio
                </p>
                <hr className="my-4"/>
                <p>
                    ¡En la seeción de Repo lo puedes hacer! :D
                </p>
                    <div className="btn btn-primary btn-lg" onClick={()=>history.push('/')}>Ir a repos</div>
            </div>
        </div>
    )
}

export default AlertInfo
