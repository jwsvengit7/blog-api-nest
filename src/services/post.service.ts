import { Injectable } from '@nestjs/common';
import { Post } from '../domain/entity/Post';
import { CreatePostInput } from '../domain/model/request/post.dto';
import { UpdatePostInput } from '../domain/model/request/update.post';
import { User } from '../domain/entity/User';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
  ) {}


  async findOne(id: string): Promise<Post> {
    return this.postRepository.findOne({ where: { id } });
  }

  async create(createPostInput: CreatePostInput, author: User): Promise<Post> {
    const post = this.postRepository.create({
      ...createPostInput,
      author,
    });
    return this.postRepository.save(post);
  }

  async update(
    id: string,
    updatePostInput: UpdatePostInput,
    user: User,
  ): Promise<Post> {
    const post = await this.findOne(id);
    if (post.author.id !== user.id) {
      throw new Error('You can only update your own posts');
    }

    Object.assign(post, updatePostInput);
    return this.postRepository.save(post);
  }
}
