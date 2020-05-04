import { AuthChecker } from "type-graphql";
import { MyContext } from "../types/MyContext";

export const customAuthChecker: AuthChecker<MyContext> = (
  { context },

  // { root, args, context, info },
  // roles,
) => {
  // here we can read the user from context
  // and check his permission in the db against the `roles` argument
  // that comes from the `@Authorized` decorator, eg. ["ADMIN", "MODERATOR"]

  // console.log(root);
  // console.log(args);
  // console.log(info);
  return !!context.req.session!.userId;
  // return true; // or false if access is denied
};