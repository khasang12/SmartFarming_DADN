import { ObjectId } from 'mongodb';

export class User{
    name: string;
    email: string;
    password: string;
    phone: string;
    create_at: Date;
    gardens: ObjectId[];
}