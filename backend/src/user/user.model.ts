// import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
// import { Document } from 'mongoose';

// export type UserDocument = User & Document;
export type UserDocument = any;
// @Schema()
// export class User {

//   @Prop()
//   id: number;
//   @Prop()
//   name: string;
//   @Prop()
//   password: string;
//   @Prop()
//   email: string;
//   @Prop()
//   phone: string;
//   @Prop()
//   create_at: string;
// }
export class User {

  id: number;
  name: string;
  password: string;
  email: string;
  phone: string;
  create_at: string;
}
// export const UserSchema = SchemaFactory.createForClass(User);
export const UserSchema ="";
