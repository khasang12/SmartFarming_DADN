import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SensorModule } from './sensor/sensor.module';
import { SensorController } from './sensor/sensor.controller';
import { UserModule } from './user/user.module';
import { HttpModule } from '@nestjs/axios/dist';

@Module({
  imports: [SensorModule, UserModule, HttpModule],
  controllers: [AppController, SensorController],
  providers: [AppService],
})
export class AppModule {}
