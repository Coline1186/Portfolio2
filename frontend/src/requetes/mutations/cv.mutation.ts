import { gql } from "@apollo/client";

export const CREATE_CV = gql`
  mutation CreateCv($input: CreateCvInput!) {
    createCv(input: $input) {
      cv
    }
  }
`;

export const UPDATE_CV = gql`
  mutation UpdateCv($input: UpdateCvInput!) {
    updateCv(input: $input) {
      id
      cv
    }
  }
`;

export const DELETE_CV = gql`
  mutation DeleteCv($id: ID!) {
    deleteCv(id: $id)
  }
`;
