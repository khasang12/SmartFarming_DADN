import { Module } from '@nestjs/common';
import { GardenController } from './garden.controller';

@Module({
  controllers: [GardenController],
})
export class GardenModule {}
