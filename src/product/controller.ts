import {Request, Response} from "express";
import db from "../db";
import ProductService, {Product} from "./service";

const jwt = require("jsonwebtoken");

export default class ProductCtrl{
    static async allProducts(_req: Request, res: Response) {
        const products = await ProductService.getAllProducts();
        res.send(products);
    };

    static async getProductById(req: Request, res: Response) {
            const singleProduct = await ProductService.getById(req.params.id);
            if(singleProduct === null){
                return res.status(404).send(`Product with id ${req.params.id} not found.`);
            }
            res.send(singleProduct);    
    };
    static async createProduct(req: Request, res: Response) {
        const product: Product = {
            product_name: req.body.product_name,
            product_price: req.body.product_price
        };
        await ProductService.createProductQuery(product);
        res.json(product);
    };
    static async createOrder(req: Request, res: Response) {
        //here we need to decode jwt token to get the user id
        const header = req.headers.authorization;
        if(header !== undefined)
        {
            const decode = await jwt.verify(header, "secret12");
            const id = decode.id;
            const sql = `INSERT INTO orders (user_id, product_id, quantity, order_status) VALUES (${id}, ${req.body.product_id}, ${req.body.quantity}, FALSE)`;
            const query = await db.query(sql);
            return res.send(query.rows);
        };
        return res.status(401).send("Token required");
    };
}