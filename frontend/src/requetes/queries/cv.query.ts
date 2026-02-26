import { gql } from "@apollo/client";

export const GET_SINGLE_CV = gql`
  query Cv {
    cv {
      id
      cv
    }
  }
`;

export const GET_CV = gql`
  query Cvs {
    cvs {
      id
      cv
    }
  }
`;
