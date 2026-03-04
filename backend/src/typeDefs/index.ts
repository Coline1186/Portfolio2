import { mergeTypeDefs } from "@graphql-tools/merge";
import { typeDefs as scalarTypeDefs } from "graphql-scalars";

import contact from "./contact";
import about from "./about";
import cv from "./cv";
import project from "./project";
import skill from "./skill";
import user from "./user";

export default mergeTypeDefs([
  about,
  contact,
  cv,
  project,
  skill,
  user,
  scalarTypeDefs,
]);