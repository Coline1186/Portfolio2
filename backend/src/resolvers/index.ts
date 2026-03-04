import path from "path";
import { loadFilesSync } from "@graphql-tools/load-files";
import { mergeResolvers } from "@graphql-tools/merge";
import { resolvers as scalarResolvers } from "graphql-scalars";

const isProd = process.env.NODE_ENV === "production";

const resolversArray = loadFilesSync(path.join(__dirname), {
  extensions: isProd ? [".resolver.js"] : [".resolver.ts"],
  recursive: true,
});

resolversArray.push(scalarResolvers);

export default mergeResolvers(resolversArray);
