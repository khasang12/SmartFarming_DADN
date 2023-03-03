import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';

@Module({ imports: [HttpModule, AuthModule] })
export class SensorModule {}
