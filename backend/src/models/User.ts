import {Entity, Column, PrimaryGeneratedColumn, OneToMany, JoinColumn} from 'typeorm'
import ImageUser from './ImageUser'

@Entity('users')
export default class User {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column()
    name: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @OneToMany(() => ImageUser, imageUser => imageUser.user, {
        cascade: ['insert', 'update']
    })
    @JoinColumn({ name: 'user_id'})
    images: ImageUser[];

}