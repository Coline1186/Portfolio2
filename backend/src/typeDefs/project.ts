import { gql } from "graphql-tag";

export default gql`
  type Skill {
    id: ID!
    name: String!
    logo: String!
  }

  type Project {
    id: ID!
    position: Int
    name: String!
    image: String!
    skills: [Skill!]!
    githubLink: String
    webLink: String
  }

  type Query {
    projects: [Project]
    projectId(id: ID!): Project
  }

  type Mutation {
    createProject(input: CreateProjectInput!): Project
    updateProject(input: UpdateProjectInput!): Project
    reorderProjects(ids: [ID!]!): Boolean
    deleteProject(id: ID!): Boolean
  }

  input CreateProjectInput {
    position: Int
    name: String!
    image: String!
    skillIds: [ID!]!
    githubLink: String
    webLink: String
  }

  input UpdateProjectInput {
    id: ID!
    position: Int
    name: String
    image: String
    skillIds: [ID]
    githubLink: String
    webLink: String
  }
`;
