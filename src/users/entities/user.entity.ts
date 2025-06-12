import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class User {
  @Field(() => Int, { description: 'User identifier' })
  id: number;

  @Field({ description: 'User name' })
  name: string;

  @Field({ description: 'User login username' })
  username: string;

  @Field({ description: 'User login email' })
  email: string;

  @Field({ description: `User password but it's unsafe for now` })
  password: string;
}
