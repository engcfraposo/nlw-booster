import express from 'express';
import multer from 'multer';
import {celebrate} from 'celebrate'


import multerConfig from './config/multer'


import ItemsController from './controllers/ItemsController'
import PointsController from './controllers/PointsController'
import Joi from '@hapi/joi';

const routes = express.Router();
const upload = multer(multerConfig);

const itemsController = new ItemsController();
const pointsController = new PointsController();

routes.get('/items', itemsController.index)

routes.post('/points', pointsController.create)
routes.get('/points', pointsController.index)
routes.get(
    '/points/:id', 
    upload.single('image'),
    celebrate({
        body: Joi.object().keys({
            name
        })
    }), 
    pointsController.show,
)

export default routes