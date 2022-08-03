import db from "../db";
import bcrypt from "bcrypt";
import ProductCtrl from "./controller";

export type Product = {
    id?: number,
    product_name: string,
    product_price: number,
    quantity?: number,
    product_category?: string
}

export default class ProductService{

    static async getAllProducts() {
        // const con = await db.connect();
        const result = await db.query(`SELECT * FROM products`);
        // con.release();
        return result.rows;
    }
    static async getById(id: string) {
        // const con = await db.connect();
        const result = await db.query(`SELECT * FROM products WHERE product_id=${id}`);
        // con.release();
        if(result.rows.length === 0)
        {
            return null
        }
        return result.rows;
    }
    static async createProductQuery(product: Product) {
        try{
            // const con = await db.connect();
            const sql = `INSERT INTO products (product_name, product_price, product_category) VALUES ('${product.product_name}', '${product.product_price}', '${product.product_category}')`;
            const result = await db.query(sql)
            // con.release;
            return result.rows;
        }catch(e)
        {
            console.log("Error at create Product Query " + e)}
    }
    // static async addProductToOrder(product: Product, user_id:string) {
    //     // const con = await db.connect();
    //     const sql = `INSERT INTO orders (quantity, product_id, user_id, order_status) VALUES (${product.quantity}, ${product.id}, '${user_id}', FALSE)`;
    //     const result = await db.query(sql);
    //     // con.release();
    //     return result.rows;
    // }
}