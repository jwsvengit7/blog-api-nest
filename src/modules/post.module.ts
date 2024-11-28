import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostService } from '../services/post.service';
import { PostResolver } from '../resolvers/post.resolver';
import { User } from '../domain/entity/User';
import { Post } from '../domain/entity/Post';
import { PostController } from '../controllers/post.controller';


@Module({
  imports: [
    TypeOrmModule.forFeature([User, Post]),

  ],
  controllers: [PostController],
  providers: [PostResolver, PostService],
})
export class PostModule {}
