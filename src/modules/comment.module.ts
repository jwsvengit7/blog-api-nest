import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Comment } from '../domain/entity/Comment';
import { Post } from '../domain/entity/Post';
import { User } from '../domain/entity/User';
import { CommentResolver } from '../resolvers/comment.resolver';
import { CommentController } from '../controllers/comment.controller';
import { CommentService } from '../services/comment.service';

@Module({
  imports: [TypeOrmModule.forFeature([Comment, Post, User])],
  providers: [CommentService, CommentResolver],
  controllers: [CommentController],
})
export class CommentModule {}
