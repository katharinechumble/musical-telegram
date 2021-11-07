const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    _id: ID!
    firstname: String
    lastname: String
    username: String
    email: String
  }

  type Query {
    me: User
  }

  type Auth {
    token: ID!
    user: User
  }

  type Mutation {
    login(username: String!, email: String!, password: String!): Auth
    addUser(
      firstname: String!
      lastname: String!
      username: String!
      email: String!
      password: String!
    ): Auth
  }
`;

module.exports = typeDefs;
