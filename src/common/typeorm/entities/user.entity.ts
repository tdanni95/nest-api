import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { UserGameListEntity } from './user-gamelist.entity';

@Entity({ name: 'user' })
export class UserEntity {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @OneToMany(() => UserGameListEntity, (userVideoGame) => userVideoGame.user)
  userVideoGames: UserGameListEntity[];
}
