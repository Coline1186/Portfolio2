import { gql } from "@apollo/client";

export const GET_PROJECT = gql`
  query Projects {
    projects {
      id
      name
      image
      webLink
      githubLink
      skills {
        id
        name
        logo
      }
    }
  }
`;
