import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserEntity } from './user.entity';
import { IsIn, IsOptional } from 'class-validator';

@Entity({ name: 'user-game' })
export class UserGameListEntity {
  @PrimaryColumn()
  userId: number;

  @PrimaryColumn()
  videoGameId: number;

  @Column({ nullable: true, default: null })
  @IsOptional()
  @IsIn([1, 2, 3, 4, 5], { message: 'Rating must be between 1 and 5.' })
  rating: number;

  @ManyToOne(() => UserEntity, (user) => user.userVideoGames)
  @JoinColumn({ name: 'userId' })
  user: UserEntity;
}
