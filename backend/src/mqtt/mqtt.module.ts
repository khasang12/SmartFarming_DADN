import { Module } from '@nestjs/common';
import { SensorModule } from 'src/sensor/sensor.module';
import { SensorService } from 'src/sensor/sensor.service';
import { MqttManager, MqttService, MQTTSubscriber, SensorSubcriber } from './mqtt.service';

@Module({
  imports: [SensorModule],
  providers: [MqttService],
  exports: [MqttService]
})
export class MqttModule {}
