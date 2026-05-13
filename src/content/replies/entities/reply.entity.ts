import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
} from 'typeorm';

import { User } from '../../../users/entities/user.entity';
import { Post } from 'src/content/posts/entities/post.entitity';


@Entity()
export class Reply {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text' })
  content: string;

  @CreateDateColumn()
  createdAt: Date;

  // 🔗 Author
  @ManyToOne(() => User, (user) => user.replies, { onDelete: 'CASCADE' })
  author: User;

  // 🔗 Parent Post
  @ManyToOne(() => Post, (post) => post.replies, { onDelete: 'CASCADE' })
  post: Post;
}
