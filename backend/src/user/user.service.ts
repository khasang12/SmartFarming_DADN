import { Injectable } from '@nestjs/common';

export interface User {
  id: number;
  name: string;
  password: string;
  email: string;
  phone: string;
  create_at: string;
}
@Injectable()
export class UserService {
  private readonly users = [
    {
      id: 1,
      name: 'david',
      password: '123456',
      email: 'davidhuynh0222@gmail.com',
      phone: '0798222233',
      create_at: '22-02-2023',
    },
  ];
  async findOne(username: string): Promise<User | undefined> {
    return this.users.find((user) => user.name === username);
  }
  
}
