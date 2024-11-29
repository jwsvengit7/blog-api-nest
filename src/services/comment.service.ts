import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comment } from '../domain/entity/Comment';
import { Post } from '../domain/entity/Post';
import { User } from '../domain/entity/User';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>,
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
  ) {}

  async create(
    content: string,
    postId: string,
    author: User,
  ): Promise<Comment> {
    const post = await this.postRepository.findOne({ where: { id: postId } });

    if (!post) {
      throw new Error('Post not found');
    }

    const comment = this.commentRepository.create({
      content,
      post,
      author,
    });

    return await this.commentRepository.save(comment);
  }


  async delete(id: string): Promise<boolean> {
    const result = await this.commentRepository.delete(id);
    return result.affected > 0;
  }
}
