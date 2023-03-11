import { HttpModule } from '@nestjs/axios';
import { AuthModule } from 'src/auth/auth.module';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SensorController } from './sensor.controller';
import { Sensor, SensorSchema } from './models/sensor.model';
import { SensorService } from './sensor.service';
import { GardenModule } from 'src/garden/garden.module';
import { GardenManagerService } from 'src/garden/gardenManager.service';
@Module({
    imports: [HttpModule, AuthModule,
        MongooseModule.forFeature([{ name: Sensor.name, schema: SensorSchema}]),
    ],
    controllers: [SensorController],
    providers: [SensorService],
    exports: [SensorService],
})
export class SensorModule {}
