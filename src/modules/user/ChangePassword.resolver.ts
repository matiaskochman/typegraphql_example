import { Query, Resolver, Mutation, Arg, Authorized, Ctx } from "type-graphql";
import bcrypt from 'bcryptjs';
import { User } from "../../entities/User";
import { redis } from "../../redis";
import { forgotPasswordPrefix } from "../../constants/RedisPrefixes";
import { ChangePasswordInput } from "./changePassword/ChangePasswordInputType";
import { MyContext } from "../../types/MyContext";

@Resolver(User)
export class ChangePasswordResolver {
  
  @Authorized()
  @Query(() => String, {nullable: true})
  async hello() {
    return 'Hello world!';
  }

  @Mutation(() => User, {nullable: true})
  async changePassword(
    @Arg('data') { 
      token, 
      password
    }:  ChangePasswordInput,
    @Ctx() ctx: MyContext 
  ): Promise<User | null> {

    const userId = await redis.get(forgotPasswordPrefix + token);

    if(!userId) {
      return null;
    }
    const user = await User.findOne(userId);

    if(!user) {
      return null;
    }

    user.password = await bcrypt.hash(password, 12);

    await user.save();
    ctx.req.session!.userId = user.id;

    return user;
  }
}
