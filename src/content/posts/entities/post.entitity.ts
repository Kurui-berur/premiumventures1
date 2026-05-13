import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  CreateDateColumn,
} from 'typeorm';

import { User } from '../../../users/entities/user.entity';
import { Reply } from '../../replies/entities/reply.entity';

@Entity()
export class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ type: 'text' })
  content: string;

  @CreateDateColumn()
  createdAt: Date;

  // 🔗 Author
  @ManyToOne(() => User, (user) => user.posts, { onDelete: 'CASCADE' })
  author: User;

  // 🔗 Replies
  @OneToMany(() => Reply, (reply) => reply.post)
  replies: Reply[];
}
