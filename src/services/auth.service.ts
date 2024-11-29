
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { User } from '../domain/entity/User';
import { RegisterDto } from '../domain/model/request/register.dto';
import { LoginDto } from '../domain/model/request/login.dto';
import {
  Injectable,
  BadRequestException,
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}


  async register(registerDto: RegisterDto): Promise<any> {
    const { username, email, password } = registerDto;

    try {
      const existingUser = await this.userRepository.findOne({
        where: [{ username }, { email }],
      });

      if (existingUser) {
        throw new ConflictException(
          'User with this username or email already exists',
        );
      }

      const hashedPassword = await bcrypt.hash(password, 10);


      const user = this.userRepository.create({
        username,
        email,
        password: hashedPassword,
      });
      await this.userRepository.save(user);

      return {
        message: 'User registered successfully',
        user: { username, email },
      };
    } catch (error) {
      if (error instanceof ConflictException) {
        throw error;
      }

      throw new InternalServerErrorException(
        'An error occurred while registering the user',
      );
    }
  }
  async validateUser(username: string, userPassword: string): Promise<any> {
    const user = await this.userRepository.findOne({ where: { username } });
    if (!user) {
      return null;
    }
    const isPasswordValid = await bcrypt.compare(userPassword, user.password);
    if (!isPasswordValid) {
      return null;
    }

    const { ...result } = user;
    return result;
  }

  async login(loginDto: LoginDto) {
    const user = await this.validateUser(loginDto.username, loginDto.password);
    if (!user) {
      throw new Error('Invalid credentials');
    }

    const payload = { username: user.email, sub: user.id };
    const accessToken = this.jwtService.sign(payload);

    return {
      id: user.id,
      username: user.username,
      email: user.email,
      accessToken,
    };
  }


}
