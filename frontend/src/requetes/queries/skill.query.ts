import { gql } from "@apollo/client";

export const GET_SKILLS = gql`
  query Skills {
  skills {
    id
    logo
    name
  }
}
`;
