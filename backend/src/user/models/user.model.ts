import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import { ObjectId } from 'mongodb';


import mongoose, { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
    @Prop({required: true})
    name: string;

    @Prop({required: true, unique: true})
    email: string;

    @Prop({required: true})
    password: string;

    @Prop({required: true})
    phone: string;

    @Prop({default: Date.now})
    create_at: Date;

    @Prop({type: [{type: mongoose.Schema.Types.ObjectId, ref: 'Garden'}]})
    gardens: ObjectId[];

    @Prop({required: true})
    x_aio_key: string;
}

export const UserSchema = SchemaFactory.createForClass(User);



