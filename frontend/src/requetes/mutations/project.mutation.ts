import { gql } from "@apollo/client";

export const CREATE_PROJECT = gql`
  mutation CreateProject($input: CreateProjectInput!) {
    createProject(input: $input) {
      id
      name
      image
      webLink
      githubLink
      skills {
        logo
      }
    }
  }
`;

export const UPDATE_PROJECT = gql`
  mutation UpdateProject($input: UpdateProjectInput!) {
    updateProject(input: $input) {
      id
      name
      image
      webLink
      githubLink
      skills {
        logo
      }
    }
  }
`;

export const DELETE_PROJECT = gql`
  mutation DeleteProject($deleteProjectId: ID!) {
    deleteProject(id: $deleteProjectId)
  }
`;
