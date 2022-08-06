import client from '../db'

export type Order = {
    id: number
    quantity: number
    user_id: number
    product_id: number
    order_status: boolean
}

export default class OrderService {
    static async getCurrentOrder(id: string): Promise<null | string[]> {
        // const con = await db.connect();
        const sql =
            await client.query(`SELECT orders.order_status, order_products.order_id, order_products.product_id, order_products.quantity,
        orders.user_id,(CASE WHEN order_status=true THEN 'complete' WHEN order_status=false THEN 'active' END) AS order_status FROM
        orders INNER JOIN order_products ON orders.order_id=order_products.order_id WHERE (user_id=${id})`)
        if (sql.rows.length === 0) {
            return null
        }
        return sql.rows
    }
}
