import { Controller, Post, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { CommentService } from '../services/comment.service';
import { JwtAuthGuard } from '../security/jwt-auth.guard';
import { CurrentUser } from '../security/decorators/current-user.decorator';
import { User } from '../domain/entity/User';

@Controller('comments')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async createComment(
    @Body() { content, postId }: { content: string; postId: string },
    @CurrentUser() user: User,
  ) {
    return this.commentService.create(content, postId, user);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async deleteComment(@Param('id') id: string) {
    return this.commentService.delete(id);
  }
}
