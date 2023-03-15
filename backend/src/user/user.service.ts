/* eslint-disable prefer-const */
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './models/user.model';
// import { User, UserDocument } from './user.model';
import { CreateUser } from './dto/create-user.dto';
import { UpdateUser } from './dto/update-user.dto';
import { Get, Query } from '@nestjs/common/decorators';
import { query } from 'express';
@Injectable()
export class UserService {

  constructor(@InjectModel(User.name) private readonly model: Model<UserDocument>) {

  }
  
  async findAll(): Promise<User[]> {
    return await this.model.find().exec();
  }

  async findOne(id: string): Promise<User> {
    return this.model.findById(id).exec();
    
  }

  async findUserByName(username: string): Promise<User | undefined> {
    return this.model.findOne({name: username}).exec();
  }
  
  async create(createUser: CreateUser): Promise<User> {
    return await new this.model({
      ...createUser,
      create_at: new Date(),
    }).save();
  }

  async update(id: string, updateUser: UpdateUser): Promise<User> {
    return await this.model.findByIdAndUpdate(id, updateUser).exec();
  }

  async delete(id: string): Promise<User> {
    return await this.model.findByIdAndDelete(id).exec();
  }
}
