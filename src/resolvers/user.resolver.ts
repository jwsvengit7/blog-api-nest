import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { AuthService } from '../services/auth.service';
import { User } from '../domain/entity/User';
import { RegisterDto } from '../domain/model/request/register.dto';
import { LoginDto } from '../domain/model/request/login.dto';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => User)
  async register(@Args('registerDto') registerDto: RegisterDto): Promise<User> {
    return this.authService.register(registerDto);
  }

  @Mutation(() => User)
  async login(@Args('loginDto') loginDto: LoginDto): Promise<{
    email: string;
    username: string;
    id: string;
    accessToken: string;
  }> {
    return this.authService.login(loginDto);
  }
}
