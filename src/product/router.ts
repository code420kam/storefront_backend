import { Router } from 'express'
import auth from '../middleware/auth'
import ProductCtrl from './controller'

export default Router()
    .post('/order', [auth], ProductCtrl.createOrder)
    .get('/:id', ProductCtrl.getProductById)
    .post('/create', [auth], ProductCtrl.createProduct)
    .get('/', ProductCtrl.allProducts)
