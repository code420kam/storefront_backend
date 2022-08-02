import app, { closeServer } from "../server";
import supertest from "supertest";
import auth from "../middleware/auth";
import userRouter from "../user/router";
import productRouter from "../product/router";
import orderRouter from "../order/router";
import db from "../db";
import server from "../server";
import UserCtrl from "../user/controller";
import { User } from "../user/service";
import { generateUserToken } from "../models/user";
import { response } from "express";
import exp from "constants";
// import { server } from "../servermock";


const request = supertest(app);
let token:any;
let user:User;
const fakeToken = "eyJhbGciOiJIUzI1NiIsIkR5cCI6IkpXVCJ9.eyJpZCI6MSwiZmlyc3RuYW1lIjoiQWRtaW4iLCJsYXN0bmFtZSI6IkFkbWluIiwiaWF0IjoxNjU5NDUzMDM4LCJleHAiOjE2NTk0NTkwMzh9.cscBp1kel02hO-Q5_Jcpd_Eid8qojO5ad5Psxxqng44";

beforeAll(async () => {
    const userToken = jest.fn(generateUserToken)
    user = {
        firstname: "Admin",
        lastname: "Admin",
        password: "admin"
    }
    token = await userToken(user);
});
describe("Testing user Endpoints", () => {

    test("Testing to get All Users with token", async () => {
        const req =  request.get("/user/");
        req.set("Authorization", token)
        expect((await req).status).toBe(200)
    });
    test("Trying to get all users with fake token",async () => {
        const req = request.get("/user/");
        req.set("Authorization", fakeToken)
        expect((await req).status).toBe(401)
    });
    test("trying to get user by id",async () => {
        const req = request.get("/user/1");
        req.set("Authorization", token);
        expect((await req).status).toBe(200);
    });
    test("trying to get not existing user by id",async () => {
        const req = request.get("/user/9999");
        req.set("Authorization", token);
        expect((await req).status).toBe(404);
    });
    test("Create a new user",async () => {
        const req = request.post("/user/create");
        req.set("Authorization", token);
        (await req).body = {
            "firstname": "examplefirstname",
            "lastname" : "examplelastname",
            "passwort" : "examplepasswort"}
        expect((await req).status).toBe(200)
    });
    })
    describe("Testing products endpoint", () => {
       test("try to get all products",async () => {
        const req = request.get("/products/");
        expect((await req).status).toBe(200);
       });
       test("try to get product by id",async () => {
        const req = request.get("/products/2");
        expect((await req).status).toBe(200);
       });
       test("try to get not existing product by id",async () => {
        const req = request.get("/products/9999");
        expect((await req).status).toBe(404);
       });
       test("try to create a product",async () => {
        const req = request.post("/products/create");
        req.set("Authorization", token);
        (await req).body = {
            "product_price": 988,
            "product_name" : "example_Product",
           };
        expect((await req).status).toBe(200)
       });
       test("try to create a product without token",async () => {
        const req = request.post("/products/create");
        (await req).body = {
            "product_price": 988,
            "product_name" : "example_Product",
           };
        expect((await req).status).toBe(401)
       });
})
describe("Testing order endpoint", () => {
    test("Try to get order by user id",async () => {
        const req = request.get("/order/1");
        req.set("Authorization", token);
        expect((await req).status).toBe(200)
    });
    test("Try to get a not existing order by user id",async () => {
        const req = request.get("/order/999");
        req.set("Authorization", token);
        expect((await req).status).toBe(404)
    })
})
            afterAll(async() => {
                
            await closeServer();
})