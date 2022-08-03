import { Router } from 'express'
import auth from '../middleware/auth'
import UserCtrl from './controller'

export default Router()
    .get('/', [auth], UserCtrl.getAllUsers)
    .post('/login', UserCtrl.userLogin)
    .get('/:id', [auth], UserCtrl.getUserById)
    .post('/create', [auth], UserCtrl.createUser)
