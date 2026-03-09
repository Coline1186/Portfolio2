import { gql } from "@apollo/client";

export const CREATE_SKILL = gql`
  mutation CreateSkill($input: CreateSkillInput!) {
    createSkill(input: $input) {
      position
      name
      logo
    }
  }
`;

export const UPDATE_SKILL = gql`
  mutation UpdateSkill($input: UpdateSkillInput!) {
    updateSkill(input: $input) {
      id
      position
      logo
      name
    }
  }
`;

export const REORDER_SKILLS = gql`
  mutation ReorderSkills($ids: [ID!]!) {
    reorderSkills(ids: $ids)
  }
`;

export const DELETE_SKILL = gql`
  mutation DeleteSkill($deleteSkillId: ID!) {
    deleteSkill(id: $deleteSkillId)
  }
`;
