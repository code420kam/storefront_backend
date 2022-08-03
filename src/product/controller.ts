import {Request, Response} from "express";
import db from "../db";
import ProductService, {Product} from "./service";
import jwt_decode from "jwt-decode";

export default class ProductCtrl{
    static async allProducts(_req: Request, res: Response):Promise<void> {
        const products = await ProductService.getAllProducts();
        res.send(products);
    }

    static async getProductById(req: Request, res: Response) :Promise<Response|undefined>{
            const singleProduct = await ProductService.getById(req.params.id);
            if(singleProduct === null){
                return res.status(404).send(`Product with id ${req.params.id} not found.`);
            }
            res.send(singleProduct);    
    }
    static async createProduct(req: Request, res: Response):Promise<void> {
        const product: Product = {
            product_name: req.body.product_name,
            product_price: req.body.product_price,
            product_category: req.body.product_category
        };
        await ProductService.createProductQuery(product);
        res.json(product);
    }
    // static async addProduct(req: Request, res: Response) {
    //     const product: Product = {
    //         product_name : req.body.product_name,
    //         product_price : req.body.product_price,
    //         product_category: req.body.product_category
    //     }
    //     await ProductService.addProductToOrder()
    // }
    static async createOrder(req: Request, res: Response):Promise<Response> {
        //here we need to decode jwt token to get the user id
        const token = req.header("authorization");
        if(token !== undefined)
        {
            interface Payload {
                id: number,
                firstname: string,
                lastname: string,
                iat: number,
                exp: number
            }
            const payload:Payload = await jwt_decode(token)
            
            
            const sql = `INSERT INTO orders (user_id, product_id, quantity, order_status) VALUES (${payload.id}, ${req.body.product_id}, ${req.body.quantity}, FALSE)`;
            const query = await db.query(sql);
            return res.send(query.rows);
        }
        return res.status(401).send("Token required");
    }
}