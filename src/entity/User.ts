import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert } from 'typeorm';
import { IsString, IsEmail, Min } from 'class-validator';
import BaseEntity from './BaseEntity';
import * as bcrypt from 'bcrypt';

@Entity()
export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @IsString()
    @Min(3)
    firstName: string;

    @Column()
    @IsString()
    @Min(3)
    lastName: string;

    @Column()
    @IsString()
    @Min(6)
    dni: string;

    @Column()
    @IsEmail()
    email: string;

    @Column()
    @IsString()
    @Min(8)
    password: string;

    @BeforeInsert()
    protected async hashPassword() {
        this.password = await bcrypt.hash(this.password, 8);
    }
}
