import { db } from "../app";
import { User } from "../interfaces/user.interface";

export class UserService {
    async create(user:User): Promise<User>{
        const email = user.email
        
        try {
            const userExist = await db.collection('Users').doc(email).get();
            if (userExist.exists){
                console.log('User already exists')
                throw new Error('User already exists') 
            }
            await db.collection('Users').add(user);
            console.log('User created successfully')
            return user;
            
        } catch (error) {
            console.log('Error creating user', error)
            throw error;
        }
    }

    async getAllUsers(): Promise<User[]>{ 
        try {
            const users: User[] = [];
            const userCollection = await db.collection('Users').get();
            userCollection.forEach((doc) => {
                const data = doc.data()
                users.push(data as User);
            });
            return users;
        } catch (error) {
            console.log('Error getting users', error)
            throw error;
        }
    };

    async getAUser(id: string): Promise<User>{
        try {
            const user  = db.collection('Users').doc(id)
            const userDoc = await user.get();
            if (!userDoc.exists){
                throw new Error('User not found')
            }
            return userDoc.data() as User;
        } catch (error) {
            console.log('Error getting user', error)
            throw error;
        }
    };

    async updateUser(id: string, user:User): Promise<User>{
        try {
            const userRef = db.collection('Users').doc(id);
            const userDoc = await userRef.get();
            if (!userDoc.exists){
                throw new Error('User not found')
            };
            const updateUser: Partial<User> = {...user}
            await userRef.update(updateUser); 
            return user ;
        } catch (error) {
            console.log('Error updating user', error)
            throw error;
            
        }
    }


}

 