import { Injectable } from '@nestjs/common';
import { connect } from 'mqtt';

@Injectable()
export class MQTTSubscriber {
  public mqttClient;
  constructor(
    protected topic: string[],
    protected username: string,
    protected password: string,
  ) {}
  launch() {
    const host = 'io.adafruit.com';
    const port = '1883';
    const clientId = `mqtt_${Math.random().toString(16).slice(3)}`;

    const connectUrl = `mqtt://${host}:${port}`;

    this.mqttClient = connect(connectUrl, {
      clientId,
      clean: true,
      connectTimeout: 4000,
      username: this.username,
      password: this.password,
      reconnectPeriod: 5000,
    });

    this.mqttClient.on('connect', () => {
      console.log('Connected');
      this.mqttClient.subscribe(this.topic, () => {
        console.log(`Subscribe to topic '${this.topic}'`);
      });
    });

    this.mqttClient.on('message', (topic, payload) => {
      console.log('Received Message:', topic, payload.toString());
    });
  }
  unsubscribe(): void {
    this.mqttClient.end();
  }
  getTopic() {
    return this.topic;
  }
  // setTopic(topic:string) {
  //   this.topic = topic;
  // }
}
@Injectable()
export class SensorSubcriber extends MQTTSubscriber {}
@Injectable()
export class PumpSubcriber extends MQTTSubscriber {
  publish(payload: string): string {
    console.log(`Publishing to ${this.topic}`);
    this.mqttClient.publish(this.topic + '/json', payload);
    return `Publishing to ${this.topic}`;
  }
}
@Injectable()
export class FanSubcriber extends MQTTSubscriber {
  publish(payload: string): string {
    console.log(`Publishing to ${this.topic}`);
    this.mqttClient.publish(this.topic + '/json', payload);
    return `Publishing to ${this.topic}`;
  }
}
@Injectable()
export class MotorSubcriber extends MQTTSubscriber {
  publish(payload: string): string {
    console.log(`Publishing to ${this.topic}`);
    this.mqttClient.publish(this.topic + '/json', payload);
    return `Publishing to ${this.topic}`;
  }
}
export class MqttManager {
  private Subcribers;
  constructor(private username: string, private password: string) {
    this.Subcribers = {};
  }
  launch() {
    let k: string;
    for (k in this.Subcribers) {
      this.Subcribers[k].launch();
    }
  }
  addSensorSubcriber(topic: string[]) {
    if (!this.Subcribers.hasOwnProperty('sensor'))
      this.Subcribers['sensor'] = new SensorSubcriber(
        topic,
        this.username,
        this.password,
      );
    return this;
  }
  addFanSubcriber(topic: string[]) {
    if (!this.Subcribers.hasOwnProperty('fan'))
      this.Subcribers['fan'] = new FanSubcriber(
        topic,
        this.username,
        this.password,
      );
    return this;
  }
  addMotorSubcriber(topic: string[]) {
    if (!this.Subcribers.hasOwnProperty('motor'))
      this.Subcribers['motor'] = new FanSubcriber(
        topic,
        this.username,
        this.password,
      );
    return this;
  }
  addPumpSubcriber(topic: string[]) {
    if (!this.Subcribers.hasOwnProperty('pump'))
      this.Subcribers['pump'] = new PumpSubcriber(
        topic,
        this.username,
        this.password,
      );
    return this;
  }
}
