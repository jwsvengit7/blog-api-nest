import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { User } from 'src/domain/entity/User';


export const CurrentUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): User => {
    const gqlContext = GqlExecutionContext.create(ctx);
    const user = gqlContext.getContext().req.user;
    console.log(user);
    return user;
  },
);
