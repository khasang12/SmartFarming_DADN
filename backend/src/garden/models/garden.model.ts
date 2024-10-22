import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ObjectId } from 'mongodb';

import mongoose, { HydratedDocument } from 'mongoose';

export type GardenDocument = HydratedDocument<Garden>;

@Schema()
export class Garden {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  owner: ObjectId;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  adaUserName: string;

  @Prop({ required: true })
  x_aio_key: string;

  @Prop()
  desc: string;

  @Prop()
  thresholds: number[];

  @Prop({ required: true })
  boundary: [{ latitude: number; longitude: number }];

  @Prop({ required: true })
  group_key: string;

  @Prop({ required: true })
  group_name: string;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }] })
  userId: ObjectId;

  @Prop({ type: {}, required: true })
  topic_list: {
    sensor: string[];
    fan: string[];
    motor: string[];
    pump: string[];
  };
}

export const GardenSchema = SchemaFactory.createForClass(Garden);