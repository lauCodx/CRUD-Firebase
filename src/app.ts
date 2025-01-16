import express from 'express';
import dotenv from 'dotenv';
dotenv.config()
import admin from 'firebase-admin';
import credentials from '../key.json';
import userRouter from './routers/users.route';

admin.initializeApp({
    credential: admin.credential.cert(credentials as admin.ServiceAccount)
});

export const db = admin.firestore();
db.settings({ ignoreUndefinedProperties: true });
const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/users', userRouter)

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`Server dey run for port ${port}`);
})