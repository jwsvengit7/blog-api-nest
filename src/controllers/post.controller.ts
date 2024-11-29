import { Controller, Get, Post, Body, Param, Put } from '@nestjs/common';
import { PostService } from '../services/post.service';
import { UseGuards } from '@nestjs/common';
import { User } from '../domain/entity/User';
import { UpdatePostInput } from '../domain/model/request/update.post';
import { JwtAuthGuard } from '../security/jwt-auth.guard';
import { CurrentUser } from '../security/decorators/current-user.decorator';
import { CreatePostInput } from '../domain/model/request/post.dto';

@Controller('posts')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Get(':id')
  async getPost(@Param('id') id: string) {
    return this.postService.findOne(id);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  async createPost(@Body() createPostInput: CreatePostInput, @CurrentUser() author: User) {
    return this.postService.createPost(createPostInput, author);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  async updatePost(
    @Param('id') id: string,
    @Body() updatePostInput: UpdatePostInput,
    @CurrentUser() author: User,
  ) {
    return this.postService.updatePost(id, updatePostInput, author);
  }
}
