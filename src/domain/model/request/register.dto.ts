import { InputType, Field } from '@nestjs/graphql';
@InputType()
export class RegisterDto {
  @Field()
  username: string;
  @Field()
  email: string;
  @Field()
  password: string;
}
