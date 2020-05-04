// import { graphql } from "graphql"
// import { createSchema } from "../utils/createSchema";
// import Maybe from "graphql/tsutils/Maybe";

// interface Options {
//   source: string;
//   variableValues?: Maybe<{[key: string]: any;}>;
// }

// export const gCall = async ({source, variableValues}: Options) => {
//   return graphql({
//     schema: await createSchema(),
//     source,
//     variableValues
//   });
  
// }

import { graphql, GraphQLSchema } from "graphql";
import Maybe from "graphql/tsutils/Maybe";

import { createSchema } from "../utils/createSchema";

interface Options {
  source: string;
  variableValues?: Maybe<{
    [key: string]: any;
  }>;
}

let schema: GraphQLSchema;

export const gCall = async ({ source, variableValues }: Options) => {
  if (!schema) {
    schema = await createSchema();
  }
  // console.log('gcall source: ', source, variableValues);
  return graphql({
    schema,
    source,
    variableValues
  });
};