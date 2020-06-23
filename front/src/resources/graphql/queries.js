import gql from 'graphql-tag';
 
export const GET_GITHUB_DATA = gql`
  query GET_GITHUB_DATA($name: String!, $owner: String!) {
    repository(name: $name, owner: $owner) {
      createdAt
      description
      name
      owner {
        login
      }
      pullRequests(first: 10) {
        edges {
          node {
            author {
              login
            }
            commits(first: 10) {
              nodes {
                id
                commit {
                  message
                }
              }
            }
          }
        }
      }
      refs(refPrefix: "refs/heads/", first: 10) {
        nodes {
          name
        }
      }
    }
  }
`


  