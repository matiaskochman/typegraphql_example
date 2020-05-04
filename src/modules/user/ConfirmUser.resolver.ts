import { Query, Resolver, Mutation, Arg, Authorized } from "type-graphql";
import { User } from "../../entities/User";
import { redis } from "../../redis";
import { confirmUserPrefix } from "../../constants/RedisPrefixes";

@Resolver(User)
export class ConfirmUserResolver {
  
  @Authorized()
  @Query(() => String, {nullable: true})
  async hello() {
    return 'Hello world!';
  }

  @Mutation(() => Boolean)
  async confirmUser(@Arg('token') token: string ): Promise<boolean> {
      const userId = await redis.get(confirmUserPrefix + token);

      if(!userId) {
        return false;
      }

      await User.update({id: parseInt(userId, 10)}, {confirmed: true});
      await redis.del(token);

      return true;
  }
}
