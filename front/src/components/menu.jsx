import React from 'react'

const Menu = () => {
    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-primary nav-gitflat">
                <div className="navbar-brand">GitFlat</div>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbar1" aria-controls="navbar1" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbar1">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item active">
                            <div className="nav-link" >Home <span className="sr-only">(current)</span></div>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="https://github.com/FlatDigital/fullstack-interview-test" rel="noopener noreferrer" target="_blank">Repositorio</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="https://github.com/FlatDigital/fullstack-interview-test" rel="noopener noreferrer" target="_blank">Backend</a>
                        </li>
                    </ul>
                </div>
            </nav>
        </div>
    )
}

export default Menu
