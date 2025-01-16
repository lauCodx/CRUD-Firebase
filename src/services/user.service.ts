import { db } from "../app";
import { User } from "../interfaces/user.interface";

export class UserService {
    async create(user:User): Promise<User>{
        try {
            await db.collection('Users').doc(user.id).set(user);
            console.log('User created successfully')
            return user;
            
        } catch (error) {
            console.log('Error creating user', error)
            throw error;
        }
    }
}

export default new UserService();