import db from "../db";

export default class OrderService{
    static async getCurrentOrder(id: String){
        const con = await db.connect();
        const sql = await db.query(`SELECT *, CASE WHEN order_status=true THEN 'complete' WHEN order_status=false THEN 'active'
        END AS order_status FROM orders WHERE order_status=false AND user_id='${id}'`);
        con.release();
        if(sql.rows.length === 0){
            return null
        }
        return sql.rows;
    }
}