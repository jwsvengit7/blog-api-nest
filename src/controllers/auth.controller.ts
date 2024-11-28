import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { LoginDto } from '../domain/model/request/login.dto';
import { RegisterDto } from '../domain/model/request/register.dto';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }
  @Post('create-account')
  async signup(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }
}
