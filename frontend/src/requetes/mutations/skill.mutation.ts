import { gql } from "@apollo/client";

export const CREATE_SKILL = gql`
  mutation CreateSkill($input: CreateSkillInput!) {
    createSkill(input: $input) {
      name
      logo
    }
  }
`;

export const UPDATE_SKILL = gql`
  mutation UpdateSkill($input: UpdateSkillInput!) {
    updateSkill(input: $input) {
      id
      logo
      name
    }
  }
`;

export const DELETE_SKILL = gql`
  mutation DeleteSkill($deleteSkillId: ID!) {
    deleteSkill(id: $deleteSkillId)
  }
`;
