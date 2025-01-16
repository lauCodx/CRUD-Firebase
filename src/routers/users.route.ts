import express from 'express';
import  { UserService } from '../services/user.service';
import { UserController } from '../controllers/user.controller';



const router = express.Router();

const userService = new UserService()
const userController = new UserController(userService);


router.post('/create', userController.createUsers.bind(userController));
router.get('/read/all', userController.getAllUsers.bind(userController));

export default router;