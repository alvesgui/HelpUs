import {Router} from 'express'
import multer from 'multer'

import uploadConfig from './config/upload'
import DonationsLocationController from './controllers/DonationsLocationController'

const routes = Router()
const upload = multer(uploadConfig)

routes.get('/donations', DonationsLocationController.index);
routes.delete('/donations/:id', DonationsLocationController.delete);
routes.get('/donations/:id', DonationsLocationController.show);
routes.post('/donations', upload.array('images'), DonationsLocationController.create);

export default routes;