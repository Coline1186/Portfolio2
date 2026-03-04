"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_tag_1 = require("graphql-tag");
exports.default = (0, graphql_tag_1.gql) `
type Skill {
    id: ID!
    name: String!
    logo: String!
}

type Query {
    skills: [Skill]
    skillId(id: ID!): Skill
}

type Mutation {
    createSkill(input: CreateSkillInput!): Skill
    updateSkill(input: UpdateSkillInput!): Skill
    deleteSkill(id: ID!): Boolean
}

input CreateSkillInput {
    name: String!
    logo: String!
}

input UpdateSkillInput {
    id: ID!
    name: String
    logo: String
}
`;
