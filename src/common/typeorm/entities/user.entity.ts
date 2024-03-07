import { IsNumberString, IsStrongPassword } from "class-validator";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: 'user'})
export class UserEntity {

    @PrimaryGeneratedColumn({ type: 'bigint' })
    id: number;

    @Column({unique: true})
    username: string

    @Column()
    password: string
}