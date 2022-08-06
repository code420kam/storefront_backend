import client from '../db'
import bcrypt from 'bcrypt'

export type User = {
    id?: number
    firstname: string
    lastname: string
    password: string
}

export default class UserService {
    static async getById(id: string): Promise<undefined | string[]> {
        // const con = await client.connect();
        const result = await client.query(`SELECT * FROM users WHERE user_id=${id}`)
        if (result.rows.length === 0) {
            return undefined
        }
        return result.rows
    }

    static async getAll(): Promise<string[]> {
        // const con = await client.connect();
        const result = await client.query(`SELECT * from users`)
        // con.release();
        return result.rows
    }

    static async newUser(user: User): Promise<void | string[]> {
        try {
            // const con = await db.connect();
            const salt = await bcrypt.genSalt(10)
            const hash = await bcrypt.hashSync(user.password + process.env.SECRET_PW, salt)
            const sql = `INSERT INTO users (firstname, lastname, password) VALUES ('${user.firstname}', '${user.lastname}', '${hash}')`
            console.log(`New User ${user.firstname} ${user.lastname} successfully created`)
            const result = await client.query(sql)
            // con.release();
            return result.rows
        } catch (e) {
            console.log('Wrong values passed ' + e)
        }
    }
    static async getPassword(user: User): Promise<null | User> {
        // const con = await db.connect();
        const sql = `SELECT password FROM users WHERE (firstname='${user.firstname}') AND (lastname='${user.lastname}') `
        const result = await client.query(sql)
        const pw = user.password + process.env.SECRET_PW
        // con.release();
        if (bcrypt.compareSync(pw, result.rows[0].password)) {
            return user
        }
        return null
    }
}
