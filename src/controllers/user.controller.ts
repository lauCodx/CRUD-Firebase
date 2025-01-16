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

    async getUser(req:Request, res:Response) : Promise<void> {
        const {id} = req.params;
        try {
            const user = await this.userService.getAUser(id);
            res.status(200).json({
                message: 'User retrieved successfully',
                data: user
            })
        } catch (error) {
            res.status(400).send('Error getting user');
        }
    };

    async updateAUser(req:Request, res:Response): Promise<void>{
        const {id} = req.params;
        const {username, email} = req.body;
        const user: User = {username, email};
        try {
            const updatedUser = await this.userService.updateUser(id, user);
            res.status(200).json({
                message: 'User updated successfully',
                data: updatedUser
            })
        } catch (error) {
            res.status(400).send('Error updating user')
            }
    }

    async deleteAUser(req:Request, res:Response): Promise<void>{
        const {id} = req.params;
        try {
            await this.userService.deleteUser(id);
            res.status(200).json({
                message: 'User deleted successfully'
            })
        } catch (error) {
            res.status(400).send('Error deleting user')
        }
    }
}
