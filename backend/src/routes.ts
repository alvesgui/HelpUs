import {Router} from 'express'
import multer from 'multer'

import uploadConfig from './config/upload'
import DonationsLocationController from './controllers/DonationsLocationController'
import UserController from './controllers/UserController'

const routes = Router()
const upload = multer(uploadConfig)

routes.get('/donations', DonationsLocationController.index);
routes.delete('/donations/:id', DonationsLocationController.delete);
routes.get('/donations/:id', DonationsLocationController.show);
routes.post('/donations', upload.array('images'), DonationsLocationController.create);

routes.get('/users', UserController.index);
routes.delete('/users/:id', UserController.delete);
routes.get('/users/:id', UserController.show);
routes.post('/users', upload.array('images'), UserController.create);
routes.post('/login', UserController.login);

export default routes;