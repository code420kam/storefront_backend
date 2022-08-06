import db from '../db'
import { Data } from './controller'

export type Product = {
    id?: number
    product_name: string
    product_price: number
    quantity?: number
    product_category?: string
}

export default class ProductService {
    static async getAllProducts(): Promise<string[]> {
        // const con = await db.connect();
        const result = await db.query(`SELECT * FROM products`)
        // con.release();
        return result.rows
    }
    static async getById(id: string): Promise<null | string[]> {
        // const con = await db.connect();
        const result = await db.query(`SELECT * FROM products WHERE product_id=${id}`)
        // con.release();
        if (result.rows.length === 0) {
            return null
        }
        return result.rows
    }
    static async createProductQuery(product: Product): Promise<string[] | void> {
        try {
            // const con = await db.connect();
            const sql = `INSERT INTO products (product_name, product_price, product_category) VALUES ('${product.product_name}', '${product.product_price}', '${product.product_category}')`
            const result = await db.query(sql)
            // con.release;
            return result.rows
        } catch (e) {
            console.log('Error at create Product Query ' + e)
        }
    }
    static async createOrderFromProduct(id: number, query: Data) {
        await db.query(`INSERT INTO orders (user_id, order_status) VALUES ('${id}', 'FALSE') `)
        const orderId = await db.query(`SELECT order_id FROM orders WHERE (user_id = ${id})`)
        const productOrders = `INSERT INTO order_products (order_id, product_id, quantity) VALUES (${orderId.rows[0].order_id}, ${query.product_id}, ${query.quantity})`
        return await db.query(productOrders)
    }
}
