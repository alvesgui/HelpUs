import {Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn} from 'typeorm'
import DonationLocation from './DonationLocation'

@Entity('images')
export default class Image {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column()
    path: string;

    @ManyToOne(() => DonationLocation, donationLocation => donationLocation.images)
    @JoinColumn({name: 'donationLocation_id'})
    donationLocation: DonationLocation 
}