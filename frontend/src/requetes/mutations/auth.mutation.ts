import { gql } from "@apollo/client";

export const CHECK_TOKEN = gql`
  mutation CheckToken {
    checkToken {
      role
      email
    }
  }
`;

export const LOGIN = gql`
  mutation Login($input: InputLogin!) {
  login(input: $input) {
    message
    success
  }
}
`;

export const LOGOUT = gql`
  mutation Logout {
    logout {
      message
      success
    }
  }
`;