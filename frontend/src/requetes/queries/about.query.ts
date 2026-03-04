import { gql } from "@apollo/client";

export const GET_ABOUT = gql`
  query Abouts {
    abouts {
      id
      image
    }
  }
`;
