//taken from https://www.apollographql.com/docs/apollo-server/example.html
//and modified - Alvin Ng

const express = require('express');
const bodyParser = require('body-parser');
import  { graphqlExpress, graphiqlExpress } from 'apollo-server-express';
import {GraphQLError} from 'graphql'
const { makeExecutableSchema } = require('graphql-tools');

// Some fake data
const users = [
  {
    name: 'KIM, Harry',
    rank: 'Captain',
    number: 43391199338,// choosing a huge number to trigger int error
  },
  {
    name: 'PARIS, Tom',
    rank: 'Lieutenant',
    number: 49202047,
  },
];

// The GraphQL schema in string form

const typeDefs = `
  type Query { users: [Users],
               user(index:Int!): Users 
              }


  type Users { name: String, rank: String, number: Int }
  


  type Mutation {auth(user:String!, password:String!): AuthResult }
  type AuthResult { token: String, error: Int}
`;

// The resolvers
const resolvers = {
  //Query is used for retrieving information
  Query: { 
          users: () => users,
          user: (root, args)=>{
                          if( args.index< users.length && args.index>=0 ){
                              return users[args.index];
                          }else{
                            throw new GraphQLError("Invalid user");
                          }
                        },                 
        }, 
  
  //Mutation indicates that something at the backend will be changed, otherwise both syntax are the same
  Mutation: { auth:(root, args)=>
              {
                return {token:args.user+ args.password, error:0}
              }
          },
};

// Put together a schema
const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

// Initialize the app
const app = express();

// The GraphQL endpoint
app.use('/graphql', bodyParser.json(), graphqlExpress({ schema }));

// GraphiQL, a visual editor for queries
app.use('/graphiql', graphiqlExpress({ endpointURL: 'graphql' }));

// Start the server


module.exports = {app}