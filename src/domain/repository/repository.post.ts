import { EntityRepository, Repository } from 'typeorm';
import { Post } from '../entity/Post';

@EntityRepository(Post)
export class PostRepository extends Repository<Post> {

  async findPostsByUserId(userId: string): Promise<Post[]> {
    return this.createQueryBuilder('post')
      .where('post.userId = :userId', { userId })
      .getMany();
  }
}
