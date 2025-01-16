import express from 'express';
import  { UserService } from '../services/user.service';
import { UserController } from '../controllers/user.controller';



const route = express.Router();

const userService = new UserService()
const userController = new UserController(userService);

// Use the createUsers function in a route
route.post('/create', userController.createUsers );

export default route;