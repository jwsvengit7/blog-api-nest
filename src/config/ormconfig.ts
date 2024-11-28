import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../domain/entity/User';
import { Post } from '../domain/entity/Post';
import { Comment } from '../domain/entity/Comment';

export const ormconfig: TypeOrmModule = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: 'Davidboma/1',
  database: 'whatsapp_ai',
  entities: [Comment, Post, User],

  synchronize: true,
};
