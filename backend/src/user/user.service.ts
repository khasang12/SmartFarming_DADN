import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './models/user.model';
// import { User, UserDocument } from './user.model';
import { CreateUser } from './dto/create-user.dto';
import { UpdateUser } from './dto/update-user.dto';
@Injectable()
export class UserService {
  // private readonly users = [
  //   {
  //     id: 1,
  //     name: 'david',
  //     password: '123456',
  //     email: 'davidhuynh0222@gmail.com',
  //     phone: '0798222233',
  //     create_at: '22-02-2023',
  //     gardens: [],
  //   },
  // ];
  // async findOne(username: string): Promise<any | undefined> {
  //   return this.users.find((user) => user.name === username);
  // }
  constructor(@InjectModel(User.name) private readonly model: Model<UserDocument>) {

  }

  async findAll(): Promise<User[]> {
    return await this.model.find().exec();
  }

  async findOne(id: string): Promise<User> {
    return await this.model.findById(id).exec();
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
