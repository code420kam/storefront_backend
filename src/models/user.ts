import jwt from "jsonwebtoken"
import { User } from "../user/service"
import "dotenv/config";
import db from "../db";

export const generateUserToken = async (user: User)=> {
    const secret = process.env.SECRET_PW;
    if(secret)
    {
        // console.log(secret)
        // await db.connect();
        const sql = `SELECT user_id FROM users WHERE (firstname='${user.firstname}') AND (lastname='${user.lastname}')`;
        const query = await db.query(sql);
        const id = query.rows[0].user_id;
        // await db.end()
        db.end()
        return jwt.sign({
            id: id,
            firstname: user.firstname,
            lastname: user.lastname,
        }, secret, {expiresIn: "6000000"})
    }
    else{
        return "invalid secret!";
    }
}

