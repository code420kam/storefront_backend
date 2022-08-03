import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import 'dotenv/config'

async function auth(req: Request, res: Response, next: NextFunction) {
    const token = req.header('authorization')
    const secret = process.env.SECRET_PW
    if (!token) {
        return res.status(401).send('Access denied. No token provided!')
    }
    if (secret)
        try {
            const verify = jwt.verify(token, secret)
            res.header(verify)
            next()
        } catch (e) {
            res.status(401).send('Token is expired please log in again')
        }
}

export default auth
