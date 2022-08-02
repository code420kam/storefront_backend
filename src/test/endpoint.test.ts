import app, { closeServer } from "../server";
import supertest from "supertest";
import auth from "../middleware/auth";
import userRouter from "../user/router";
import productRouter from "../product/router";
import orderRouter from "../order/router";
import db from "../db";
import UserCtrl from "../user/controller";
import { User } from "../user/service";
import { generateUserToken } from "../models/user";


const request = supertest(app);
let token:any;
let user:User;
const fakeToken = "eyJhbGciOiJIUzI1NiIsIkR5cCI6IkpXVCJ9.eyJpZCI6MSwiZmlyc3RuYW1lIjoiQWRtaW4iLCJsYXN0bmFtZSI6IkFkbWluIiwiaWF0IjoxNjU5NDUzMDM4LCJleHAiOjE2NTk0NTkwMzh9.cscBp1kel02hO-Q5_Jcpd_Eid8qojO5ad5Psxxqng44";

describe("Testing user Endpoints", () => {
    beforeAll(async () => {
        // db.connect();
        const userToken = jest.fn(generateUserToken)
        user = {
            firstname: "Admin",
            lastname: "Admin",
            password: "admin"
        }
        token = await userToken(user);
    });

    test("Testing to get All Users without token",async() => {
        return request
        .get("/user/")
        .expect(401);
    });
    test("Try to login",async () => {
        await supertest(app)
        .post("/user/login")
        .send({user})
        .set("Authorization", token)
        .end((err, res) => {
            if(err){
                console.log(err)
            }
            console.log(res.header)
            
        })
        });
        

    })
afterAll(async() => {
    await closeServer();
    await db.end();
})