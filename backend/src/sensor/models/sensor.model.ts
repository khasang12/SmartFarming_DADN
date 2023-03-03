import {Schema, Document} from 'mongoose';

const SensorSchema = new Schema({
    name: {type: String, required: true},
    feed_key : {type: String},
    type : {type: String, required: true},
    status: {type: Boolean, required: true},
    value: {type: Number, required: true},
    last_update: {type: Date},
    desc: {type: String},
},{
    timestamps: true,
    collection: 'sensors'
});

export {SensorSchema};

export interface Sensor extends Document {
    name: string;
    feed_key: string;
    type: string;
    status: boolean;
    value: number;
    last_update: Date;
    desc: string;
}