import express, { Request, Response } from 'express'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import 'dotenv/config'
import userRouter from './user/router'
import productRouter from './product/router'
import orderRouter from './order/router'

const app: express.Application = express()

const port = process.env.SERVER_PORT
const address = process.env.POSTGRES_URL

app.use(bodyParser.json())
app.use(cookieParser())
app.use('/user', userRouter)
app.use('/products', productRouter)
app.use('/order', orderRouter)
app.get('/', function (req: Request, res: Response) {
    // res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000")
    res.send(req.body)
})

// server.listen(port)
export const server = app.listen(port, () => {
    console.log(`Listening on ${address}:${port}`)
})
export const closeServer = async () => await server.close()
export default app
