/* eslint-disable @typescript-eslint/no-empty-function */
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Garden, GardenDocument } from './models/garden.model';
import { UpdateGarden } from './dto/update-garden.dto';
import { CreateGardenDTO } from './dto/create-garden.dto';

@Injectable()
export class GardenService {
  constructor(@InjectModel(Garden.name) private readonly model: Model<GardenDocument>) {

  }
  async findAll(): Promise<Garden[]> {
    return await this.model.find().exec();
  }
  async findOne(id: string): Promise<Garden> {
    return await this.model.findById(id).exec();
  }
  async create(createGarden: CreateGardenDTO): Promise<Garden> {    
    return await new this.model({
      ...createGarden,
      create_at: new Date(),
    }).save();
  }
  async update(id: string, updateGarden: UpdateGarden): Promise<Garden> {
    return await this.model.findByIdAndUpdate(id, updateGarden).exec();
  }
  async delete(id: string): Promise<Garden> {
    return await this.model.findByIdAndDelete(id).exec();
  }
}



