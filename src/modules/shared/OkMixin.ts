import { ClassType, InputType, Field } from "type-graphql";

export const OkMixin = <T extends ClassType>(BaseClass: T) => {

  @InputType()
  class OkInputType extends BaseClass {

    @Field()
    ok: boolean;
  }
  return OkInputType;
}