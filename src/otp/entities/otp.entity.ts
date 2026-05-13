// otp.entity.ts
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Otp {

  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  code!: string;
  @Column()
  email!: string;

  @Column()
  expiresAt!: Date;
}