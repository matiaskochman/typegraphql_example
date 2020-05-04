import {Entity, PrimaryGeneratedColumn, Column, BaseEntity} from "typeorm";
import { ObjectType, ID, Field, Root } from "type-graphql";

@ObjectType()
@Entity()
export class User extends BaseEntity{
    @Field(() => ID)
    @PrimaryGeneratedColumn()
    id: number;

    @Field()
    @Column("text")
    firstName: string;

    @Field()
    @Column("text")
    lastName: string;

    @Field()
    // @Column("text")
    @Column("text", {unique: true})
    email: string;

    @Field()
    name(@Root() parent: User): string {
      return `${parent.firstName} ${parent.lastName}`;
    }

    @Column()
    password: string;

    @Column('boolean', {default: false})
    confirmed: boolean;

}