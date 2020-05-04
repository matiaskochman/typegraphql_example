import { Query, Resolver, Mutation, Arg, Authorized } from "type-graphql";
import { User } from "../../entities/User";
import { redis } from "../../redis";
import { v4 } from "uuid";
import { sendEmail } from "../../utils/SendMail";
import { forgotPasswordPrefix } from "../../constants/RedisPrefixes";

@Resolver(User)
export class ForgotPasswordResolver {
  
  @Authorized()
  @Query(() => String, {nullable: true})
  async hello() {
    return 'Hello world!';
  }

  @Mutation(() => Boolean)
  async forgotPassword(@Arg('email') email: string ): Promise<boolean> {

    const user = await User.findOne({where:{email}});

    if(!user) {
      return false
    }

    const token = v4();
    await redis.set(forgotPasswordPrefix + token, user.id, "ex", 60 * 60 * 24);
    await sendEmail(
      email,
      `http://localhost:3000/user/change-password/${token}`
    );

      return true;
  }
}
