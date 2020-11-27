import {Request, Response} from 'express'
import { getRepository } from 'typeorm';
import * as Yup from 'yup'

import User from '../models/User'

import userView from '../views/users_view'


export default { 
    async index(request: Request, response: Response) {
        const usersRepository = getRepository(User)

        const users = await usersRepository.find({
            relations: ['images']
        });

        return response.json(userView.renderMany(users))

    },

    async show(request: Request, response: Response) {

        const {id} = request.params;

        const userRepository = getRepository(User)

        const user = await userRepository.findOneOrFail(id, {
            relations: ['images']
        });

        return response.json(userView.render(user))

    },

    async create(request: Request, response: Response) {
        const {
            name,
            email,
            password,
        } = request.body;
    
        const userRepository = getRepository(User)

        const requestImages = request.files as Express.Multer.File[];
        
        const images = requestImages.map(image => {
            return { path: image.filename}
        })

        const data = {
            name,
            email,
            password,
            images
        }

        const schema = Yup.object().shape({
            name: Yup.string().required(),
            email: Yup.string().required(),
            password: Yup.string().required(),
            images: Yup.array(Yup.object().shape({
                path: Yup.string().required()
            }))
        })

        await schema.validate(data, {
            abortEarly: false,
        })
    
        const user = userRepository.create(data);
    
        await userRepository.save(user);
    
        return response.status(201).json(user)
    },

    async delete(request: Request, response: Response) {
        const {id} = request.params;
    
        const userRepository = getRepository(User)

        const user = await userRepository.delete(id);

        return response.status(200).json({message: "deletado"})

    },

    async login(request: Request, response: Response) {
        const {
            email,
            password
        } = request.body;
       
        const userRepository = getRepository(User)

        const user = await userRepository.findOne({ email: email});


        if (user?.email == email && user?.password == password) {
            return response.status(200).json(user)
        }

        return response.status(401).json({message: "Falha nas credenciais de Login"})
        
    },

    

}