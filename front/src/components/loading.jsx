import React from 'react'

const Loading = () => {
    return (
        <div className="text-center mt-5 pt-5">
            <div className="spinner-grow" style={{width: '8rem', height: '8rem'}} role="status">
                <span className="sr-only">Loading...</span>
            </div>
            <p className="mt-4">Buscando repo...</p>
        </div>
    )
}

export default Loading
