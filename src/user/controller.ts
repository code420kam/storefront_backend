import { Request, Response } from "express";
import UserService, { User } from "./service";
import { generateUserToken } from "../models/user";

export default class UserCtrl{
    //creating new User
    static async createUser (req: Request, res: Response):Promise<void> {
        const user: User = {
            firstname : req.body.firstname,
            lastname : req.body.lastname,
            password: req.body.passwort,
        };
            const newUser = await UserService.newUser(user);
            res.json(newUser);
    }
    //user login function
    static async userLogin(req: Request, res: Response):Promise<Response|void>{
        const user:User = {
            firstname : req.body.firstname,
            lastname: req.body.lastname,
            password: req.body.password
        };

        const authentication = await UserService.getPassword(user);
        
        if(authentication === null)
        {
            return res.send("Login failure. Firstname or lastname or password wrong. Please try again");
        }
            const publicToken  = await generateUserToken(user);
            res.header("authorization", publicToken);
            res.send(`Welcome back ${user.firstname} ${user.lastname}!`);
        }

    //getting all available Users
    static async getAllUsers(req: Request, res: Response):Promise<void> {
        try{
            const users = await UserService.getAll();
            res.send(users)
        }
        catch(e)
        {
            res.status(400).send("Unknown Error " + e);
        }
    }

    //getting single user searched by id
    static async getUserById(req: Request, res: Response):Promise<void> {
            const singleUser = await UserService.getById(req.params.id);
            if(singleUser === undefined){
                res.status(404).send("Error: User doesn't exists");
            }
            res.send(singleUser);
    }
}