import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserController } from './user.controller';
import { UserSchema } from './user.model';
import { UserService } from './user.service';

@Module({
  controllers: [UserController],
  providers: [UserService],
  // imports: [MongooseModule.forFeature([{ name: 'user', schema: UserSchema }])],
  exports: [UserService],
})
export class UserModule {}
