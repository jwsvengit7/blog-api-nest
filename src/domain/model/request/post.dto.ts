import { IsNotEmpty, IsString } from 'class-validator';

export class CreatePostInput {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  content: string;
}
