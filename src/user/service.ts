import db from "../db";
import client from "../db";
import bcrypt from "bcrypt";
import { Connection, Pool } from "pg";
import { updateInterfaceDeclaration } from "typescript";

export type User = {
    id?: number,
    firstname: string,
    lastname: string,
    password: string,
}

export default class UserService{
    static async getById(id: string){
        // const con = await client.connect();
        const result = await db.query(`SELECT * FROM users WHERE user_id=${id}`);
        if(result.rows.length === 0){
            return undefined;
        };
        return result.rows;
    };

    static async getAll() {
        // const con = await client.connect();
        const result = await db.query(`SELECT * from users`);
        // con.release();
        return result.rows;
    };

    static async newUser(user : User){
        try{
            // const con = await db.connect();
            const salt = await bcrypt.genSalt(10);
            const hash = await bcrypt.hashSync(user.password + process.env.SECRET_PW, salt);
            const sql = `INSERT INTO users (firstname, lastname, passwort) VALUES ('${user.firstname}', '${user.lastname}', '${hash}')`;
            console.log(`New User ${user.firstname} ${user.lastname} successfully created`)
            const result = await db.query(sql);
            // con.release();
            return result.rows;
        }catch(e)
        {
            console.log("Wrong values passed "  + e)
        };
    }
    static async getPassword(user:User) {
        // const con = await db.connect();
        const sql = `SELECT passwort FROM users WHERE (firstname='${user.firstname}') AND (lastname='${user.lastname}') `;
        const result = await db.query(sql);
        const pw = user.password + "secret12";
        // con.release();
        if(bcrypt.compareSync(pw, result.rows[0].passwort)){
            return user;
        };
        return null;
        
    }
    }