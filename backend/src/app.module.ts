import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SensorModule } from './sensor/sensor.module';
import { SensorController } from './sensor/sensor.controller';
import { UserModule } from './user/user.module';
import { HttpModule } from '@nestjs/axios/dist';
import { GardenModule } from './garden/garden.module';
import { AuthModule } from './auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
@Module({
  imports: [
    SensorModule,
    UserModule,
    HttpModule,
    GardenModule,
    AuthModule,
    MongooseModule.forRoot('mongodb://localhost/authentication'),
  ],
  controllers: [AppController, SensorController],
  providers: [AppService],
})
export class AppModule {}
