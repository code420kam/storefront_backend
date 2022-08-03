import { Pool } from 'pg'
import dotenv from 'dotenv'

dotenv.config()
const { POSTGRES_DB, POSTGRES_PASSWORD, POSTGRES_URL, POSTGRES_USER } = process.env

export default new Pool({
    user: POSTGRES_USER,
    host: POSTGRES_URL,
    database: POSTGRES_DB,
    password: POSTGRES_PASSWORD,
})
