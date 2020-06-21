import React, {useState, useEffect} from 'react';
import { useQuery } from '@apollo/react-hooks';

import './App.css';
import logo from './logo.svg'
import Menu from './components/menu'
import Form from './components/form'
import Branches from './components/branches'
import ListRepo from './components/listRepo'
import CreatePullRequest from './screens/createPullRequest'
import {GET_PRs} from './resources/graphql/queries'


function App() {
  const [listBranch, setListBranch] = useState(null)
  const [idRepo, setIdRepo] = useState('FlatDigital/fullstack-interview-test')
  const [formData, setFormData] = useState({ 
    name: "fullstack-interview-test", 
    owner: "FlatDigital" 
})

  useEffect(() => {

  },[])

  const { loading, error, data } = useQuery(GET_PRs, { 
    onCompleted: data => {
      const {name, refs, owner, description} = data.repository
      console.log('dataRepo',data.repository)
      setListBranch(refs.nodes)
    },
    variables: formData
  });

  if (loading) return 'Loading...';
  if (error) return `Error! ${error.message}`;

  return (
    <>
      <Menu idRepo={idRepo}/>
      <div style={{paddingTop: '70px'}}>
        <div className="text-center mb-4">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="h3 mb-3 font-weight-normal">GitFlat</h1>
        </div>

        <ul className="nav nav-tabs" style={{display: 'flex', justifyContent: 'center'}}>
          <li className="nav-item">
            <a className="nav-link active" data-toggle="tab" href="#repo">Repo</a>
          </li>
          
          <li className="nav-item">
            <a className="nav-link" data-toggle="tab" href="#info">Info</a>
          </li>

          <li className="nav-item">
            <a className="nav-link" data-toggle="tab" href="#pr">PR's</a>
          </li>
        </ul>

        <div id="myTabContent" className="tab-content">
          <div className="tab-pane fade active show" id="repo">
            <Form setListBranch={setListBranch} formData={formData} setFormData={setFormData}
            setIdRepo={setIdRepo}/>
            <ListRepo/>
          </div>
          <div className="tab-pane fade" id="pr">
            <CreatePullRequest dataRepo={{id: 8}}/>
          </div>
          <div className="tab-pane fade" id="info">
            { listBranch && <Branches listBranch={listBranch}/> }
          </div>
        </div>
      </div>

     

      <p className="mt-5 mb-3 text-muted text-center">© {new Date().getFullYear()}</p>
    </>
  );
}

export default App;
