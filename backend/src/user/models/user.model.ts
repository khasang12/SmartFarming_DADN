import { Schema, Document, ObjectId } from 'mongoose';
const UserSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone: { type: String, required: true },
    create_at: { type: Date, default: Date.now },
    gardens: [{ type: Schema.Types.ObjectId, ref: 'Garden' }],
},{
    timestamps: true,
    collection: 'users'
})
export {UserSchema};

export interface User extends Document {
    name: string;
    email: string;
    password: string;
    phone: string;
    create_at: Date;
    gardens: ObjectId[];
}