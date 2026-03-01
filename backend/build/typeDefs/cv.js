"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_tag_1 = require("graphql-tag");
exports.default = (0, graphql_tag_1.gql) `
type Cv {
    id: ID!
    cv: String!
}

type Query {
    cv: Cv
    cvs: [Cv]
    cvId(id: ID!): Cv
}

type Mutation {
    createCv(input: CreateCvInput!): Cv
    updateCv(input: UpdateCvInput!): Cv
    deleteCv(id: ID!): Boolean
}

input CreateCvInput {
    cv: String!
}

input UpdateCvInput {
    id: ID!
    cv: String
}
`;
