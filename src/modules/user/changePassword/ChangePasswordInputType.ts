import { Field, InputType } from "type-graphql";
import { PasswordInputTypeMixin } from '../../shared/PasswordInputTypeMixin';
// import { OkMixin } from "../../shared/OkMixin";

@InputType()
// export class ChangePasswordInput extends OkMixin(PasswordInputTypeMixin(class {})){
  export class ChangePasswordInput extends PasswordInputTypeMixin(class {}){  

  @Field()
  token: string;

}