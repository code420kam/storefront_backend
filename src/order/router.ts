import { Router } from 'express'
import auth from '../middleware/auth'
import OrderCrtl from './controller'

export default Router().get('/:id', [auth], OrderCrtl.getOrder)
