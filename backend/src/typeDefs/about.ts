import { gql } from "graphql-tag";

export default gql`
  type About {
    id: ID!
    position: Int
    image: String!
  }

  type Query {
    abouts: [About]
    aboutId(id: ID!): About
  }

  type Mutation {
    createAbout(input: CreateAboutInput!): About
    updateAbout(input: UpdateAboutInput!): About
    reorderAbouts(ids: [ID!]!): Boolean
    deleteAbout(id: ID!): Boolean
  }

  input CreateAboutInput {
    position: Int
    image: String!
  }

  input UpdateAboutInput {
    id: ID!
    position: Int
    image: String
  }
`;
