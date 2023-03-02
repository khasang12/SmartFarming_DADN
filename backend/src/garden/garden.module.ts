import { Module } from '@nestjs/common';
import { GardenController } from './garden.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { GardenSchema } from './models/garden.model';
@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'User', schema: GardenSchema }]),
  ],
  controllers: [GardenController],
})
export class GardenModule {}
