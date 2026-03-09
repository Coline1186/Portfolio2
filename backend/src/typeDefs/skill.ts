import { gql } from "graphql-tag";

export default gql`
  type Skill {
    id: ID!
    position: Int!
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
    reorderSkills(ids: [ID!]!): Boolean
    deleteSkill(id: ID!): Boolean
  }

  input CreateSkillInput {
    position: Int!
    name: String!
    logo: String!
  }

  input UpdateSkillInput {
    id: ID!
    name: String
    logo: String
  }
`;
