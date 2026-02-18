import { gql } from "@apollo/client";

export const GET_USER_INFO = gql`
  query UserInfo($userInfoId: ID!) {
    userInfo(id: $userInfoId) {
      id
      email
      role
    }
  }
`;
