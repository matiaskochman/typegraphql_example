import { createResolver } from "../shared/BaseResolver";
import { User } from "../../entities/User";
import { RegisterInputType } from "./register/RegisterInputType";

export const CreateUserResolver = createResolver(
  "User",
  User,
  RegisterInputType,
  User
);