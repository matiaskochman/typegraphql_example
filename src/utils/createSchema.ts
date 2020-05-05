import { buildSchema } from "type-graphql"
// import { customAuthChecker } from "../utils/AuthRules"


// export const createSchema = async () => {
//     return await buildSchema({
//       resolvers: [`${__dirname}/../modules/**/*.resolver.ts`],
//       authChecker: customAuthChecker,
//     })
// }



import { ChangePasswordResolver } from "../modules/user/ChangePassword.resolver";
import { ConfirmUserResolver } from "../modules/user/ConfirmUser.resolver";
import { ForgotPasswordResolver } from "../modules/user/ForgotPassword.resolver";
import { LoginResolver } from "../modules/user/Login.resolver";
import { LogoutResolver } from "../modules/user/Logout.resolver";
import { CurrentUserResolver } from "../modules/user/CurrentUser.resolver";
import { RegisterResolver } from "../modules/user/Register.resolver";
import { CreateProductResolver } from "../modules/product/Product.resolver";
import { CreateUserResolver } from "../modules/user/CreateUser.resolver";

export const createSchema = () =>
  buildSchema({
    resolvers: [
      ChangePasswordResolver,
      ConfirmUserResolver,
      ForgotPasswordResolver,
      LoginResolver,
      LogoutResolver,
      CurrentUserResolver,
      RegisterResolver,
      CreateProductResolver,
      CreateUserResolver
    ],
    authChecker: ({ context: { req } }) => {
      return !!req.session.userId;
    }
  });
