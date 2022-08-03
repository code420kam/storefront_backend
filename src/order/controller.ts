import { Request, Response } from 'express'
import OrderService from './service'

export default class OrderCtrl {
    static async getOrder(req: Request, res: Response) {
        const order = await OrderService.getCurrentOrder(req.params.id)
        if (order === null) {
            return res.status(404).send(`There are no active orders for User Id ${req.params.id}`)
        }
        res.send(order)
    }
}
