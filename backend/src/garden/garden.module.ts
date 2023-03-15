import { Module } from '@nestjs/common';
import { GardenController } from './garden.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Garden, GardenSchema } from './models/garden.model';
import { GardenService } from './garden.service';
import { UserModule } from 'src/user/user.module';
import { SensorModule } from 'src/sensor/sensor.module';
import { SensorService } from 'src/sensor/sensor.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Garden.name, schema: GardenSchema },
    ]),
    UserModule,
    SensorModule,
  ],
  controllers: [GardenController],
  providers: [GardenService],
  exports: [GardenService],
})
export class GardenModule {}
