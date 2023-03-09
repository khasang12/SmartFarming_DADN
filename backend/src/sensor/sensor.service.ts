import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateSensor } from './dto/create-sensor.dto';
import { UpdateSensor } from './dto/update-sensor.dto';
import { Sensor, SensorDocument } from './models/sensor.model';

@Injectable()
export class SensorService {
    constructor(@InjectModel(Sensor.name) private readonly model: Model<SensorDocument>) {

    }
    async findAll(): Promise<Sensor[]> {
        return await this.model.find().exec();
    }
    async findOne(id: string): Promise<Sensor> {
        return await this.model.findById(id).exec();
    }

    async create(createSensor: CreateSensor): Promise<Sensor> {
        return await new this.model({
            ...createSensor,
            create_at: new Date(),
        }).save();
    }

    async update(id: string, updateSensor: UpdateSensor): Promise<Sensor> {
        return await this.model.findByIdAndUpdate(id, updateSensor).exec();
    }

    async delete(id: string): Promise<Sensor> {
        return await this.model.findByIdAndDelete(id).exec();
    }
}