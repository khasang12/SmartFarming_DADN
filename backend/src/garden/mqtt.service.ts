import { Injectable } from '@nestjs/common';
import { connect } from 'mqtt';

@Injectable()
export class MQTTSubcribers {
  public mqttClient;
  private topic;
  //   constructor(
  //     public host: string,
  //     public port: string,
  //     public clientID: string,
  //     public topic: string,
  //     private username: string,
  //     private password: string,
  //   ) {}
  launch() {
    const host = 'io.adafruit.com';
    const port = '1883';
    const clientId = `mqtt_${Math.random().toString(16).slice(3)}`;

    const connectUrl = `mqtt://${host}:${port}`;
    this.topic = 'Potato_Stack/feeds/iot-cnpm.button1';

    this.mqttClient = connect(connectUrl, {
      clientId,
      clean: true,
      connectTimeout: 4000,
      username: 'davidhuynh22',
      password: 'aio_bycn1154ctLCUtXTwnacwJafCeWm',
      reconnectPeriod: 5000,
    });

    this.mqttClient.on('connect', () => {
      console.log('Connected');
      this.mqttClient.subscribe([this.topic], () => {
        console.log(`Subscribe to topic '${this.topic}'`);
      });
    });

    this.mqttClient.on('message', (topic, payload) => {
      console.log('Received Message:', topic, payload.toString());
    });
  }
  publish(payload: string): string {
    console.log(`Publishing to ${this.topic}`);
    this.mqttClient.publish(this.topic + '/json', payload);
    return `Publishing to ${this.topic}`;
  }
}
