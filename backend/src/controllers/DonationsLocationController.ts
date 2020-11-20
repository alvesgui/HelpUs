import {Request, Response} from 'express'
import { getRepository } from 'typeorm';
import * as Yup from 'yup'

import DonationLocation from '../models/DonationLocation'

import donationLocationView from '../views/donationLocations_views'

export default {
    async index(request: Request, response: Response) {
        const donationsLocationRepository = getRepository(DonationLocation)

        const donationLocations = await donationsLocationRepository.find({
            relations: ['images']
        });

        return response.json(donationLocationView.renderMany(donationLocations))

    },

    async show(request: Request, response: Response) {

        const {id} = request.params;

        const donationsLocationRepository = getRepository(DonationLocation)

        const donationLocation = await donationsLocationRepository.findOneOrFail(id, {
            relations: ['images']
        });

        return response.json(donationLocationView.render(donationLocation))

    },


    async create(request: Request, response: Response) {
        const {
            name,
            latitude,
            longitude,
            about,
            objects,
            available_hours,
            available_to_attend,
        } = request.body;
    
        const donationsLocationRepository = getRepository(DonationLocation)

        const requestImages = request.files as Express.Multer.File[];
        
        const images = requestImages.map(image => {
            return { path: image.filename}
        })

        const data = {
            name,
            latitude,
            longitude,
            about,
            objects,
            available_hours,
            available_to_attend,
            images
        }

        const schema = Yup.object().shape({
            name: Yup.string().required(),
            latitude: Yup.number().required(),
            longitude: Yup.number().required(),
            about: Yup.string().required().max(300),
            objects: Yup.string().required(),
            available_hours: Yup.string().required(),
            available_to_attend: Yup.boolean().required(),
            images: Yup.array(Yup.object().shape({
                path: Yup.string().required()
            }))
        })

        await schema.validate(data, {
            abortEarly: false,
        })
    
        const donationLocation = donationsLocationRepository.create(data);
    
        await donationsLocationRepository.save(donationLocation);
    
        return response.status(201).json(donationLocation)
    },

    async delete(request: Request, response: Response) {
        const {id} = request.params;
    
        const donationsLocationRepository = getRepository(DonationLocation)

        const donationLocation = await donationsLocationRepository.delete(id);

        return response.status(200).json({message: "deletado"})

    },
}