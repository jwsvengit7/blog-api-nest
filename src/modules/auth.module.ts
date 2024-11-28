import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';

import * as dotenv from 'dotenv';
import { JWTStartegy } from '../security/jwt.strategy';
import { User } from '../domain/entity/User';
import { Post } from '../domain/entity/Post';
import { Comment } from '../domain/entity/Comment';
import { AuthController } from '../controllers/auth.controller';
import { AuthService } from '../services/auth.service';
import { JwtAuthGuard } from '../security/jwt-auth.guard';

dotenv.config();
const secret =
  '404E635266556A586E3272357538782F413F4428472B4B6250645367566B5970ARN304N39FR3NRF44';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Post, Comment]),
    JwtModule.register({
      global: true,
      secret: secret,
      signOptions: {
        expiresIn: '1h',
      },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JWTStartegy, JwtAuthGuard],
})
export class AuthModule {}
