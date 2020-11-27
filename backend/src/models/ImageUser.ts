import {Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn} from 'typeorm'
import User from './User'

@Entity('image_users')
export default class ImageUser {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column()
    path: string;

    @ManyToOne(() => User, user => user.images)
    @JoinColumn({name: 'user_id'})
    user: User 
}