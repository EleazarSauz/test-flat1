import React, {useState, useEffect} from 'react';
import {useQuery} from '@apollo/react-hooks';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import {GET_GITHUB_DATA} from './resources/graphql/queries'
import {getListRepoApi} from './resources/fuctions'
import PullRequest from './screens/pullRequest'
import ErrorMessage from './components/error'
import Loading from './components/loading'
import Menu from './components/menu'
import Info from './screens/info'
import Repo from './screens/repo'
import './App.css';

const initRepo = {
  id_repo: "FlatDigital/fullstack-interview-test",
  name: "fullstack-interview-test", 
  owner: "FlatDigital"
}

function App() {
  const [dataGitApi, setDataGitApi] = useState(null)
  const [dataGitHub, setDataGitHub] = useState({
    id_repo: initRepo.id_repo,
    in_github: true
  })
  const [formDataRepo, setFormDataRepo] = useState({
    name: initRepo.name, 
    owner: initRepo.owner
  })
  const [arrayRepo, setArrayRepo] = useState([])

  useEffect(() => {
    getListRepoApi()
      .then(data => {
        setArrayRepo(data)
      })
  },[])

  const { loading, error } = useQuery(GET_GITHUB_DATA, {
    variables: {
      name: initRepo.name,
      owner: initRepo.owner
    },
    onCompleted: data => {
      setDataGitHub(data.repository)
    }
  });

  if (error) return <ErrorMessage/>;
  
  if (loading) return <Loading/>;
    return (
      <Router>
         
        <Menu dataGitApi={dataGitApi}/>
  
        <Switch>
          <Route path="/pullRequest">
            <PullRequest dataGitApi={dataGitApi} />
          </Route>

          <Route path="/infoGit">
            <Info dataGitApi={dataGitApi} dataGitHub={dataGitHub}/>
          </Route>

          <Route path="/">
              <Repo setArrayRepo={setArrayRepo} formDataRepo={formDataRepo} setFormDataRepo={setFormDataRepo} setDataGitApi={setDataGitApi} 
                dataGitHub={dataGitHub} setDataGitHub={setDataGitHub} arrayRepo={arrayRepo} dataGitApi={dataGitApi}/>
          </Route>
        </Switch>
  
        <footer className="text-center p-3 mt-5">
          made with &nbsp;
          <i className="fa fa-2x fa-heart animate__animated animate__infinite animate__pulse " style={{color: "#ef4e5b"}}></i>
          &nbsp; by: <a href="https://twitter.com/EleazarSauz" target="_blank" rel="noopener noreferrer">@EleazarSauz</a>
        </footer>
      </Router>
    );
  }

export default App;
