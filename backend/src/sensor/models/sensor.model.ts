import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';

import mongoose, { HydratedDocument } from 'mongoose';

export type SensorDocument = HydratedDocument<Sensor>;

@Schema()
export class Sensor {
    @Prop({required: true})
    name: string;

    @Prop()
    feed_key: string;

    @Prop({required: true})
    type: string;

    @Prop({required: true})
    status: boolean;

    @Prop({required: true})
    value: number;

    @Prop()
    last_update: Date;

    @Prop()
    desc: string;
}

export const SensorSchema = SchemaFactory.createForClass(Sensor);