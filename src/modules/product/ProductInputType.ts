import { Field, InputType } from "type-graphql";

@InputType()
export class ProductInputType {
  @Field()
  name: string;
}
