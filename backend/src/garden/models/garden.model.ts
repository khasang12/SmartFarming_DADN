import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import mongoose, { HydratedDocument } from 'mongoose';
import { Sensor } from 'src/sensor/models/sensor.model';

export type GardenDocument = HydratedDocument<Garden>;

@Schema()
export class Garden {
    @Prop({ required: true })
    name: string;

    @Prop()
    desc: string;

    @Prop({ required: true })
    boundary: [{ lat: number, lng: number }];

    @Prop({ required: true })
    group_key: string;

    @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Sensor' }] })
    sensors: Sensor[];
}

export const GardenSchema = SchemaFactory.createForClass(Garden);
