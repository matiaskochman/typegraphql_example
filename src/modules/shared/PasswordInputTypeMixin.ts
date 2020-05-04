

import { ClassType, InputType, Field } from "type-graphql";
import { MinLength } from "class-validator";

export const PasswordInputTypeMixin = <T extends ClassType>(BaseClass: T) => {

  @InputType()
  class PasswordInputType extends BaseClass{
    @Field()
    @MinLength(5)
    password: string;
  }
    return PasswordInputType;
}