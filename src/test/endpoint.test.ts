import app, { closeServer } from "../server";
import supertest from "supertest";
import { User } from "../user/service";
import { generateUserToken } from "../models/user";

const request = supertest(app);
let token:any;
let user:User;
const fakeToken = "eyJhbGciOiJIUzI1NiIsIkR5cCI6IkpXVCJ9.eyJpZCI6MSwiZmlyc3RuYW1lIjoiQWRtaW4iLCJsYXN0bmFtZSI6IkFkbWluIiwiaWF0IjoxNjU5NDUzMDM4LCJleHAiOjE2NTk0NTkwMzh9.cscBp1kel02hO-Q5_Jcpd_Eid8qojO5ad5Psxxqng44";

beforeAll(async ():Promise<void> => {
    const userToken = jest.fn(generateUserToken)
    user = {
        firstname: "Admin",
        lastname: "Admin",
        password: "admin"
    }
    token = await userToken(user);
});
describe("Testing user Endpoints", ():void => {

    test("Testing to get All Users with token", async ():Promise<void> => {
        const req =  request.get("/user/");
        req.set("Authorization", token);
        expect((await req).status).toBe(200);
    });
    test("Trying to get all users with fake token",async ():Promise<void> => {
        const req = request.get("/user/");
        req.set("Authorization", fakeToken);
        expect((await req).status).toBe(401);
    });
    test("trying to get user by id",async ():Promise<void> => {
        const req = request.get("/user/1");
        req.set("Authorization", token);
        expect((await req).status).toBe(200);
    });
    test("trying to get not existing user by id",async ():Promise<void> => {
        const req = request.get("/user/9999");
        req.set("Authorization", token);
        expect((await req).status).toBe(404);
    });
    test("Create a new user",async ():Promise<void> => {
        const req = request.post("/user/create");
        req.set("Authorization", token);
        req.send({
            "firstname": "examplefirstname",
            "lastname" : "examplelastname",
            "passwort" : "examplepasswort"});
        expect((await req).status).toBe(200);
    });
    })
    describe("Testing products endpoint", ():void => {
       test("try to get all products",async ():Promise<void> => {
        const req = request.get("/products/");
        expect((await req).status).toBe(200);
       });
       test("try to get product by id",async ():Promise<void> => {
        const req = request.get("/products/2");
        expect((await req).status).toBe(200);
       });
       test("try to get not existing product by id",async ():Promise<void> => {
        const req = request.get("/products/9999");
        expect((await req).status).toBe(404);
       });
       test("try to create a product",async ():Promise<void> => {
        const req = request.post("/products/create");
        req.set("Authorization", token);
        
        req.send({
            "product_price": "988",
            "product_name" : "example_Product",
           })
        expect((await req).status).toBe(200);
       });
       test("try to create a product without token",async ():Promise<void> => {
        const req = request.post("/products/create");
        req.send({
            "product_price": 988,
            "product_name" : "example_Product",
           });
        expect((await req).status).toBe(401);
       });
})
describe("Testing order endpoint", ():void => {
    test("Try to get order by user id",async ():Promise<void> => {
        const req = request.get("/order/1");
        req.set("Authorization", token);
        expect((await req).status).toBe(200);
    });
    test("Try to get a not existing order by user id",async ():Promise<void> => {
        const req = request.get("/order/999");
        req.set("Authorization", token);
        expect((await req).status).toBe(404);
    })
})
            afterAll(async():Promise<void> => {
            await closeServer();
})