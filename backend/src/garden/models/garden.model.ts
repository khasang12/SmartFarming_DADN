import {Schema, Document} from 'mongoose';

const GardenSchema = new Schema({
    name: {type: String, required: true},
    desc: {type: String},
    latitude: {type: Number, required: true},
    longitude: {type: Number, required: true},
    group_key: {type: String, required: true},
    sensors: [{type: Schema.Types.ObjectId, ref: 'Sensor'}],
});

export {GardenSchema};

export interface Garden extends Document {
    name: string;
    desc: string;
    latitude: number;
    longitude: number;
    group_key: string;
    sensors: string[];
}
