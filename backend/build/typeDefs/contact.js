"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_tag_1 = require("graphql-tag");
exports.default = (0, graphql_tag_1.gql) `
type Query {
  _empty: String
}

type Mutation {
  sendContact(input: ContactInput!): Boolean!
}

input ContactInput {
  firstName: String!
  lastName: String!
  email: String!
  message: String!
}
`;
