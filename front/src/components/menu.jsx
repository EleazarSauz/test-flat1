import React from 'react'
import { useHistory, useLocation } from "react-router-dom";

import logo from '../logo.svg'

    
const Menu = ({dataGitApi}) => {
    let history = useHistory();
    let location = useLocation();
    const itemsMenu = [
        {
            path: '/',
            text: 'Repo'
        },
        {
            path: '/infoGit',
            text: 'Info'
        },
        {
            path: '/pullRequest',
            text: 'PRs'
        }
    ]
    return (
    <>
        <div className="text-center">
            <img src={logo} className="App-logo" alt="logo" />
            <h1 className="h3 font-weight-normal">GitFlat</h1>
        </div>

        <div className="menu-sticky" style={{top: -1}}>
            <p className="text-center">
              Repo seleccionado: <br />
              <span className="badge badge-light"> {dataGitApi && dataGitApi.id_repo} </span>
            </p>
        </div>

        <ul className="nav nav-tabs pt-2 menu-sticky" style={{top: 40}}>
            {
                itemsMenu.map((i,index) => (
                    <li key={index} className="nav-item" onClick={() => history.push(i.path) }>
                      <div className={`nav-link ${ location.pathname === i.path && 'active'}`}>{i.text}</div>
                    </li>
                ))
            }
        </ul>
    </>
    )
}

export default Menu
