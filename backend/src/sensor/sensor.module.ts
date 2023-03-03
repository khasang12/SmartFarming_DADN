import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SensorController } from './sensor.controller';
import { SensorSchema } from './models/sensor.model';
@Module({
    imports: [HttpModule,
        MongooseModule.forFeature([{ name: 'Sensor', schema: SensorSchema }]),
    ],
    controllers: [SensorController],
})
export class SensorModule { }
