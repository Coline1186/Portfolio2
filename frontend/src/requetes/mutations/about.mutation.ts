import { gql } from "@apollo/client";

export const CREATE_ABOUT = gql`
  mutation CreateAbout($input: CreateAboutInput!) {
    createAbout(input: $input) {
      image
    }
  }
`;

export const UPDATE_ABOUT = gql`
  mutation UpdateAbout($input: UpdateAboutInput!) {
    updateAbout(input: $input) {
      id
      image
    }
  }
`;

export const DELETE_ABOUT = gql`
  mutation DeleteAbout($deleteAboutId: ID!) {
  deleteAbout(id: $deleteAboutId)
}
`;
