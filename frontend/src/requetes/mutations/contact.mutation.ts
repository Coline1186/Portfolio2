import { gql } from "@apollo/client";

export const SEND_CONTACT = gql`
  mutation SendContact($input: ContactInput!) {
    sendContact(input: $input)
  }
`;
