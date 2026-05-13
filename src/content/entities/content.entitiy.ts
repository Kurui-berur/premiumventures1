import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
} from 'typeorm';

export type ContentType =
  | 'discussion'
  | 'lecture'
  | 'reply'
  | 'post';

@Entity()
export class Content {
  @PrimaryGeneratedColumn('uuid')
    id!: string;

  // 🔥 Core classification
  @Column()
    type!: ContentType;

  // 🔥 Enables replies / nesting
  @Index()
  @Column({ nullable: true })
  parentId?: string;

  @Column()
    authorId!: string;

  // 🧩 links to block system
  @Column({ type: 'jsonb', default: [] })
    blockIds!: string[];

  // 🧠 soft delete support (important for moderation)
  @Column({ default: true })
    isActive!: boolean;

  @CreateDateColumn()
    createdAt!: Date;

  @UpdateDateColumn()
    updatedAt!: Date;
}
