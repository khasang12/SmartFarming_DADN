import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './models/user.model';
// import { User, UserDocument } from './user.model';

@Injectable()
export class UserService {
  // constructor(
  //   @InjectModel('user') private readonly userModel: Model<UserDocument>,
  //  ) {}

  // async createUser(...props : any): Promise<User> {
  //   return this.userModel.create({
  //     // property
  //   });
  // }
  private readonly users = [
    {
      id: 1,
      name: 'david',
      password: '123456',
      email: 'davidhuynh0222@gmail.com',
      phone: '0798222233',
      create_at: '22-02-2023',
      gardens: [],
    },
  ];
  async findOne(username: string): Promise<any | undefined> {
    return this.users.find((user) => user.name === username);
  }
}
