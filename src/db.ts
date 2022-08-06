import { Pool } from 'pg'
import dotenv from 'dotenv'

dotenv.config()
const { POSTGRES_DB, POSTGRES_PASSWORD, POSTGRES_URL, POSTGRES_USER, ENV, POSTGRES_TEST_DB } = process.env

let client:Pool = new Pool;
if(ENV === 'dev') {
    client = new Pool({
      host: POSTGRES_URL,
      database: POSTGRES_DB,
      user: POSTGRES_USER,
      password: POSTGRES_PASSWORD,
    })
  }
  if(ENV === 'test') {
   client =  new Pool({
      host: POSTGRES_URL,
      database: POSTGRES_TEST_DB,
      user: POSTGRES_USER,
      password: POSTGRES_PASSWORD,
    })
  }
export default client;
