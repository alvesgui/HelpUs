import {Entity, Column, PrimaryGeneratedColumn, OneToMany, JoinColumn} from 'typeorm'
import Image from './Image'

@Entity('donationLocations')
export default class DonationLocation {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column()
    name: string;

    @Column()
    latitude: number;

    @Column()
    longitude: number;

    @Column()
    about: string;

    @Column()
    objects: string;

    @Column()
    available_hours: string;

    @Column()
    available_to_attend: boolean;
    
    @Column()
    city: string;

    @Column()
    uf: string;

    @Column()
    whatsapp: number;

    @Column()
    price: string;

    @OneToMany(() => Image, image => image.donationLocation, {
        cascade: ['insert', 'update']
    })
    @JoinColumn({ name: 'donationLocation_id'})
    images: Image[];
}