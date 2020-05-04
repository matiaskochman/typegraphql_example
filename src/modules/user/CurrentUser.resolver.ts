import { Query, Resolver, Ctx } from "type-graphql";
import { User } from "../../entities/User";
import { MyContext } from "../../types/MyContext";

@Resolver(User)
export class CurrentUserResolver {
  
  @Query(() => User, {nullable: true})
  async currentUser(@Ctx() ctx: MyContext): Promise<User | undefined> {
    if(!ctx.req.session!.userId) {
      return undefined;
    }
    return User.findOne(ctx.req.session!.userId);
  }

}
