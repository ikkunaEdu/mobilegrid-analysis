var { graphql, buildSchema } = require('graphql');
import ApolloClient from "apollo-boost";
import gql from 'graphql-tag';

var schema = buildSchema(`
  type Query {
    hello: String
  }
`);

var root = { hello: () => 'Hello world!' };

graphql(schema, '{ hello }', root).then((response) => {
  console.log(response);
});


const client = new ApolloClient({
    request: async operation => {
      operation.setContext({
        headers: {
          authorization: "da2-vkhs5p3c7zdotmcxbkmhcwztu4"
        }
      });
    },
    uri: 'https://d746ukrjcrekxopmw6p3ei6leu.appsync-api.us-east-1.amazonaws.com/graphql'
  });

  client.query({
    query: gql`
      query TodoApp {
        todos {
          id
          text
          completed
        }
      }
    `,
  })
    .then(data => console.log(data))
    .catch(error => console.error(error));