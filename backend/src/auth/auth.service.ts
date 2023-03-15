import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/user/models/user.model';
@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string): Promise<User> {
    const user = await this.usersService.findUserByName(username);
    if (user && user.password === password) {
      return user
    }
    return null;
  }

  async login(user: User) {
    const payload = { username: user.name, sub: user.x_aio_key };
    return {
      access_token: this.jwtService.sign(payload),
      user: user
    };
  }
}
