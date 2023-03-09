import { Module } from '@nestjs/common';
import { GardenController } from './garden.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Garden, GardenSchema } from './models/garden.model';
import { GardenService } from './garden.service';
@Module({
  imports: [
    MongooseModule.forFeature([{ name: Garden.name, schema: GardenSchema }]),
  ],
  controllers: [GardenController],
  providers: [GardenService],
  exports: [GardenService],

})
export class GardenModule {}
