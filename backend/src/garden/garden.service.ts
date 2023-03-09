/* eslint-disable @typescript-eslint/no-empty-function */
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Garden, GardenDocument } from './models/garden.model';
import { CreateGarden } from './dto/create-garden.dto';
import { UpdateGarden } from './dto/update-garden.dto';
interface Subject {
  subcribe(observer: Observer): void;
  unsubcribe(observer: Observer): void;
  notify(news: string): void;
}

interface IObserver {
  update(news: string): void;
}

// class Garden implements Subject {
//   private observers: Observer[];
//   subcribe(observer: Observer): void {
//     this.observers.push(observer);
//   }
//   unsubcribe(observer: Observer): void {
//     this.observers = this.observers.filter((ele) => ele.id === observer.id);
//   }
//   notify(news: string): void {
//     this.observers.forEach((observer) => observer.update(news));
//   }
// }

class Observer implements IObserver {
  private feed: string[];
  constructor(public id: number, public name: string) { };
  update(news: string): void {
    this.feed.push(news);
    console.log('New Feeds');
  }
}

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
  async create(createGarden: CreateGarden): Promise<Garden> {
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
