"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_tag_1 = require("graphql-tag");
exports.default = (0, graphql_tag_1.gql) `
  type About {
      id: ID!
      image: String!
  }

  type Query {
      abouts: [About]
      aboutId(id: ID!): About
  }

  type Mutation {
      createAbout(input: CreateAboutInput!): About
      updateAbout(input: UpdateAboutInput!): About
      deleteAbout(id: ID!): Boolean
  }

  input CreateAboutInput {
      image: String!
  }

  input UpdateAboutInput {
      id: ID!
      image: String
  }
`;
