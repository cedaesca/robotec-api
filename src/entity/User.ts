import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    BeforeInsert,
    BeforeUpdate,
} from 'typeorm';
import { IsString, IsEmail, Length } from 'class-validator';
import BaseEntity from './BaseEntity';
import * as bcrypt from 'bcrypt';

@Entity()
export default class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @IsString()
    @Length(3)
    firstName: string;

    @Column()
    @IsString()
    @Length(3)
    lastName: string;

    @Column({ unique: true })
    @IsString()
    @Length(6)
    dni: string;

    @Column({ unique: true })
    @IsEmail()
    email: string;

    @Column()
    @IsString()
    @Length(8)
    password: string;

    @BeforeInsert()
    @BeforeUpdate()
    protected async hashPassword() {
        this.password = await bcrypt.hash(this.password, 8);
    }
}
