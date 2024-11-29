import { Injectable, Logger } from '@nestjs/common';
import { Post } from '../domain/entity/Post';
import { CreatePostInput } from '../domain/model/request/post.dto';
import { UpdatePostInput } from '../domain/model/request/update.post';
import { User } from '../domain/entity/User';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class PostService {
  private readonly logger = new Logger(PostService.name);
  constructor(
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
  ) {}


  async findOne(id: string): Promise<Post> {
    return this.postRepository.findOne({ where: { id } });
  }

  /**
   * Creates a new post and associates it with an author.
   * @param createPostInput - The data for creating a new post.
   * @param author - The user who is creating the post.
   * @returns The created post object along with additional metadata.
   */

  async createPost(
    createPostInput: CreatePostInput,
    author: User,
  ): Promise<any> {
    if (!author) {
      throw new Error('Invalid author. Please provide a valid user.');
    }

    const post = this.postRepository.create({
      ...createPostInput,
      author,
    });

    try {
      await this.postRepository.save(post);

      this.logger.log(`Post created successfully with ID: ${post.id}`);

      return {
        ...createPostInput,
        authorId: post.author.id,
      };
    } catch (error) {
      this.logger.error('Failed to create post', error.stack);
      throw new Error('Failed to create post. Please try again later.');
    }
  }

  async updatePost(
    id: string,
    updatePostInput: UpdatePostInput,
    user: User,
  ): Promise<any> {
    const post = await this.findOne(id);
    if (post.author.id !== user.id) {
      throw new Error('You can only update your own posts');
    }

    Object.assign(post, updatePostInput);
    await this.postRepository.save(post);
    return {
      ...UpdatePostInput,
      authorId: post.author.id,
    };
  }
}
