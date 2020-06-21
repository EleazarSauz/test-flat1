import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { setContext } from 'apollo-link-context';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloProvider } from 'react-apollo';



const httpLink = createHttpLink({ uri: 'https://api.github.com/graphql' })

const middlewareLink = setContext(() => ({
  headers: {
    'Authorization': 'bearer ' + process.env.REACT_APP_TOKEN_GITHUB
  }
}))

//6d5d6d86b1d4561eafe165042db6a5d0
//58c9ea4f30729a12b8d4c40a486148e3

const client = new ApolloClient({
  link: middlewareLink.concat(httpLink),
  cache: new InMemoryCache(),
})


ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

serviceWorker.unregister();
