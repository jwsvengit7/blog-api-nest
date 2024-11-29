import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';

import * as dotenv from 'dotenv';
import { JwtStrategy } from '../security/jwt.strategy';
import { User } from '../domain/entity/User';
import { Post } from '../domain/entity/Post';
import { Comment } from '../domain/entity/Comment';
import { AuthController } from '../controllers/auth.controller';
import { AuthService } from '../services/auth.service';
import { JwtAuthGuard } from '../security/jwt-auth.guard';
import { UserResolver } from '../resolvers/user.resolver';

dotenv.config();
const secret = process.env.SECRET_KEY as string;

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
  providers: [AuthService, JwtStrategy, JwtAuthGuard, UserResolver],
})
export class AuthModule {}
