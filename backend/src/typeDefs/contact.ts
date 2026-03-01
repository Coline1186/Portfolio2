import { gql } from "graphql-tag";


export default gql`
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
