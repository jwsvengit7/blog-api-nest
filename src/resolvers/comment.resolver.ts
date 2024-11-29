import { Resolver, Mutation, Args, Parent, ResolveField } from '@nestjs/graphql';
import { Comment } from '../domain/entity/Comment';
import { Post } from '../domain/entity/Post';
import { User } from '../domain/entity/User';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../security/jwt-auth.guard';
import { CurrentUser } from '../security/decorators/current-user.decorator';
import { CommentService } from '../services/comment.service';
import { CreateCommentInput } from '../domain/model/request/comment.dto';

@Resolver(() => Comment)
export class CommentResolver {
  constructor(private readonly commentService: CommentService) {}

  /**
   * Mutation to create a comment
   */
  @Mutation(() => Comment)
  @UseGuards(JwtAuthGuard)
  async createComment(
    @Args('input') input: CreateCommentInput,
    @CurrentUser() author: User,
  ): Promise<Comment> {
    return this.commentService.create(input.content, input.postId, author);
  }


  /**
   * Mutation to delete a comment
   */
  @Mutation(() => Boolean)
  @UseGuards(JwtAuthGuard)
  async deleteComment(@Args('id') id: string): Promise<boolean> {
    return this.commentService.delete(id);
  }

  /**
   * Resolve the `user` field for a comment
   */
  @ResolveField(() => User)
  async user(@Parent() comment: Comment): Promise<User> {
    return comment.author;
  }

  /**
   * Resolve the `post` field for a comment
   */
  @ResolveField(() => Post)
  async post(@Parent() comment: Comment): Promise<Post> {
    return comment.post;
  }
}
