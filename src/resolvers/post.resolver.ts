import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { PostService } from '../services/post.service';
import { Post } from '../domain/entity/Post';
import { UpdatePostInput } from '../domain/model/request/update.post';
import { JwtAuthGuard } from '../security/jwt-auth.guard';
import { CurrentUser } from '../security/decorators/current-user.decorator';
import { User } from '../domain/entity/User';
import { CreatePostInput } from '../domain/model/request/post.dto';
import { UseGuards } from '@nestjs/common';

@Resolver(() => Post)
export class PostResolver {
  constructor(private readonly postService: PostService) {}

  @Query(() => Post)
  async getPost(@Args('id') id: string) {
    return this.postService.findOne(id);
  }

  @Mutation(() => Post)
  @UseGuards(JwtAuthGuard)
  async createPost(
    @Args('createPostInput') createPostInput: CreatePostInput,
    @CurrentUser() user: User,
  ) {
    return this.postService.create(createPostInput, user);
  }

  @Mutation(() => Post)
  @UseGuards(JwtAuthGuard)
  async updatePost(
    @Args('id') id: string,
    @Args('updatePostInput') updatePostInput: UpdatePostInput,
    @CurrentUser() user: User,
  ) {
    return this.postService.update(id, updatePostInput, user);
  }
}
