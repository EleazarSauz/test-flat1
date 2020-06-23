import React from 'react'

const ErrorMessage = ({message="Error de conexión :("}) => {
    return (
        <div className="text-center mt-5 pt-5">
            <h2 className="mt-4">{message}</h2>
        </div>
    )
}

export default ErrorMessage
