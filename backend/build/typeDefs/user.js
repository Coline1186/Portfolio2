"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_tag_1 = require("graphql-tag");
exports.default = (0, graphql_tag_1.gql) `
enum UserRole {
  ADMIN
}

type User {
  id: ID!
  email: String!
  password: String!
  role: UserRole!
}

type UserWithoutPassword {
  id: ID!
  email: String!
  role: UserRole!
}

type Message {
  message: String!
  success: Boolean!
}

type CheckToken {
   email: String!
   role: UserRole!
}

type Mutation {
     register(input: InputRegister!): UserWithoutPassword
     login(input: InputLogin!): Message!
     logout: Message!
     checkToken: CheckToken
}

type Query {
    userInfo(id: ID!): UserWithoutPassword
    }

input InputRegister {
    email: String!
    password: String!
}

input InputLogin {
    email: String!
    password: String!
}
`;
