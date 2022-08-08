import { Request, Response } from 'express'
import ProductService, { Product } from './service'
import jwt_decode from 'jwt-decode'

export type Data = {
    product_id: number
    quantity: number
}

export default class ProductCtrl {
    static async allProducts(_req: Request, res: Response): Promise<void> {
        const products = await ProductService.getAllProducts()
        // res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000")
        res.send(products)
    }

    static async getProductById(req: Request, res: Response): Promise<Response | undefined> {
        const singleProduct = await ProductService.getById(req.params.id)
        if (singleProduct === null) {
            return res.status(404).send(`Product with id ${req.params.id} not found.`)
        }
        res.send(singleProduct)
    }
    static async createProduct(req: Request, res: Response): Promise<void> {
        const product: Product = {
            product_name: req.body.product_name,
            product_price: req.body.product_price,
            product_category: req.body.product_category,
        }
        await ProductService.createProductQuery(product)
        res.json(product)
    }

    static async createOrder(req: Request, res: Response): Promise<string | Response> {
        console.log(req.body.length)
        //here we need to decode jwt token to get the user id
        const token = req.header('authorization')
        if (token !== undefined) {
            interface Payload {
                id: number
                firstname: string
                lastname: string
                iat: number
                exp: number
            }

            const data: Data = {
                product_id: req.body.product_id,
                quantity: req.body.quantity,
            }
            const payload: Payload = await jwt_decode(token)
            console.log(payload.id)
            await ProductService.createOrderFromProduct(payload.id, data)
            return res.send(`Product with ID ${data.product_id} is successfull added`)
        }
        return res.status(401).send('Token required')
    }
}
