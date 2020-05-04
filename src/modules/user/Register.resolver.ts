import { Query, Resolver, Mutation, Arg, Authorized } from "type-graphql";
import bcrypt from 'bcryptjs'; //esModuleInterop flag in tsconfig
import { User } from "../../entities/User";
import { RegisterInputType } from "./register/RegisterInputType";
import { sendEmail } from "../../utils/SendMail";
import { createConfirmationUrl } from '../../utils/CreateConfirmationUrl';

@Resolver(User)
export class RegisterResolver {
  
  @Authorized()
  @Query(() => String, {nullable: true})
  async hello() {
    return 'Hello world!';
  }

  @Mutation(() => User)
  async register(
    @Arg("data")
    {
      firstName, 
      lastName, 
      email, 
      password
    }: RegisterInputType
  ): Promise<User> {
    const hashedPassword = await bcrypt.hash(password, 15);

    const user = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword
    }).save()

    await sendEmail(email, await createConfirmationUrl(user.id));
    return user;
  }
}
