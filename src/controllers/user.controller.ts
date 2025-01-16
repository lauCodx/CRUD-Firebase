import { Request, Response } from "express";
import { User } from "../interfaces/user.interface";
import { UserService } from "../services/user.service";




export class UserController {
    constructor(private userService: UserService){}

    async createUsers (req:Request, res:Response): Promise<void>{
       
        try {
            const {username, email} = req.body;
            const user: User = {username, email};
            
            const createdUser = await this.userService.create(user);
            res.status(201).json({
                message: 'User created successfully',
                data: createdUser
            });
            
        } catch (error) {
            res.status(400).send('Error creating user');
        }
    };

    async getAllUsers (req:Request, res:Response): Promise<void>{
        try {
            const users: User[] = await this.userService.getAllUsers();
            res.status(200).json({
                message: 'Users retrieved successfully',
                data: users
            });
        } catch (error) {
            res.status(400).send('Error getting users');
        }
    }
}
