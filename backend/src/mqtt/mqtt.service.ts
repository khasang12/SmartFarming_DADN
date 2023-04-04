import { Inject, Injectable } from '@nestjs/common';
import { connect } from 'mqtt';
import { SensorService } from 'src/sensor/sensor.service';


@Injectable()
export class MqttService {
  @Inject(SensorService)
  private readonly sensorService: SensorService
  getManager(username: string, password: string) {
    return new MqttManager(username, password, this.sensorService);
  }
}

export class MQTTSubscriber {
  public mqttClient;
  public static cb; // Call back notify function

  // @Inject(SensorService)
  // protected readonly sensorService: SensorService

  constructor(
    protected topic: string[],
    protected username: string,
    protected password: string,
    protected sensorService : any
  ) {
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
  }
  launch() {
    this.mqttClient.on('connect', () => {
      console.log('Connected');
      this.mqttClient.subscribe(this.topic, () => {
        console.log(`Subscribe to topic '${this.topic}'`);
      });
    });
  }
  unsubscribe(): void {
    this.mqttClient.end();
  }
  getTopic() {
    return this.topic;
  }
  addDevices(newTopic: string[]): boolean {
    this.topic = this.topic.concat(
      newTopic.filter((elem) => this.topic.indexOf(elem) < 0),
    );
    return true;
  }
  removeDevices(newTopic: string[]): boolean {
    this.topic = this.topic.filter((elem) => newTopic.indexOf(elem) >= 0);
    return true;
  }

  clearDevice() {
    this.topic = [];
  }
}


export class SensorSubcriber extends MQTTSubscriber {
  launch() {
    this.mqttClient.on('connect', () => {
      console.log('Connected');
      this.mqttClient.subscribe(this.topic, () => {
        console.log(`Subscribe to topic '${this.topic}'`);
      });
    });

    this.mqttClient.on('message', (topic, payload) => {
      MQTTSubscriber.cb(topic, payload);
      console.log(`Received Message On Sensor: ${payload}`);
      this.sensorService.create({
        desc: '',
        feed_key: topic,
        last_update: new Date(),
        name: 'sensor',
        status: true,
        type: 'sensor',
        value: payload,
      });
    });
  }
}


export class PumpSubcriber extends MQTTSubscriber {
  launch() {
    this.mqttClient.on('connect', () => {
      console.log('Connected');
      this.mqttClient.subscribe(this.topic, () => {
        console.log(`Subscribe to topic '${this.topic}'`);
      });
    });
    this.mqttClient.on('message', (topic, payload) => {
      MQTTSubscriber.cb(topic, payload);
      console.log(`Received Message On Pump: ${payload}`);
      this.sensorService.create({
        desc: '',
        feed_key: topic,
        last_update: new Date(),
        name: 'pump',
        status: true,
        type: 'pump',
        value: payload,
      });
    });
  }

  publish(feed_key: string, payload: string): any {
    if (!(feed_key in this.topic)) {
      return null;
    }
    console.log(`Publishing to ${this.topic}`);
    this.mqttClient.publish(feed_key + '/json', payload);
    return {
      code: 200,
      status: `Publishing to ${feed_key}`,
    };
  }
}

export class FanSubcriber extends MQTTSubscriber {
  launch() {
    this.mqttClient.on('connect', () => {
      console.log('Connected');
      this.mqttClient.subscribe(this.topic, () => {
        console.log(`Subscribe to topic '${this.topic}'`);
      });
    });
    this.mqttClient.on('message', (topic, payload) => {
      MQTTSubscriber.cb(topic, payload);
      console.log(`Received Message On Fan: ${payload}`);
      this.sensorService.create({
        desc: '',
        feed_key: topic,
        last_update: new Date(),
        name: 'fan',
        status: true,
        type: 'fan',
        value: payload,
      });
      
    });
  }
  publish(feed_key: string, payload: string): any {
    if (!this.topic.includes(feed_key)) {
      return null;
    }
    console.log(`Publishing to ${this.topic}`);
    this.mqttClient.publish(feed_key + '/json', payload);
    return {
      code: 200,
      status: `Publishing to ${feed_key}`,
    };
    return `Publishing to ${feed_key}`;
  }
}

export class MotorSubcriber extends MQTTSubscriber {
  launch() {
    this.mqttClient.on('connect', () => {
      console.log('Connected');
      this.mqttClient.subscribe(this.topic, () => {
        console.log(`Subscribe to topic '${this.topic}'`);
      });
    });
    this.mqttClient.on('message', (topic, payload) => {
      MQTTSubscriber.cb(topic, payload);
      console.log('Received Message On Motor:');
      this.sensorService.create({
        desc: '',
        feed_key: topic,
        last_update: new Date(),
        name: 'motor',
        status: true,
        type: 'motor',
        value: payload,
      });
    });
  }
  publish(feed_key: string, payload: string): any {
    if (!(feed_key in this.topic)) {
      return null;
    }
    console.log(`Publishing to ${this.topic}`);
    this.mqttClient.publish(feed_key + '/json', payload);
    return {
      code: 200,
      status: `Publishing to ${feed_key}`,
    };
  }
}

// Factory Pattern

class SubcriberFactory {
  createSubcriber(
    type: string,
    topic: string[],
    username: string,
    password: string,
    sensorService
  ): MQTTSubscriber {
    if (type === 'sensor') {
      return new SensorSubcriber(topic, username, password, sensorService);
    } else if (type === 'pump') {
      return new PumpSubcriber(topic, username, password, sensorService);
    } else if (type === 'motor') {
      return new MotorSubcriber(topic, username, password, sensorService);
    } else if (type === 'fan') {
      return new FanSubcriber(topic, username, password,sensorService);
    }
    return null;
  }
}

export class MqttManager {
  private Subcribers;
  private notifyFunction;
  constructor(private username: string, private password: string, private sensorService: any) {
    this.Subcribers = {};
  }
  launch(): void {
    let k: string;
    for (k in this.Subcribers) {
      this.Subcribers[k].launch();
    }
  }
  getCurrentDeviceType(): string[] {
    return Object.keys(this.Subcribers);
  }
  publish(type: string, topic: string, payload) {
    if (this.getCurrentDeviceType().includes(type)) {
      return this.Subcribers[type].publish(topic, payload);
    }
    return {
      code: 404,
      status: 'Device Type Not Found',
    };
  }
  addSubcriber(type: string, topic: string[] = []) {
    const newSubscriber: MQTTSubscriber = new SubcriberFactory().createSubcriber(
      type,
      topic,
      this.username,
      this.password,
      this.sensorService
    );

    if (newSubscriber === null) throw Error('Device Type not Available');

    if (!this.Subcribers.hasOwnProperty(type))
      this.Subcribers[type] = newSubscriber;

    return this;
  }

  removeDevices(feed_keys: string[], type: string): boolean {
    try {
      if (this.Subcribers.hasOwnProperty(type)) {
        this.Subcribers[type].removeDevices(feed_keys);
      } else {
        console.log('Device type not exist');
        return false;
      }
    } catch (error) {
      console.log(error);
      return false;
    }
    return true;
  }

  addDevices(feed_keys: string[], type: string): boolean {
    try {
      if (this.Subcribers.hasOwnProperty(type)) {
        this.Subcribers[type].addDevices(feed_keys);
      } else {
        console.log('Device type not exist');
        return false;
      }
    } catch (error) {
      console.log(error);
      return false;
    }
    return true;
  }

  removeSubcriber(subcType: string): boolean {
    if (subcType in this.Subcribers) {
      delete this.Subcribers[subcType];
      return true;
    }
    return false;
  }

  setNotify(cb: any) {
    MQTTSubscriber.cb = cb;
  }

  getInfo() {
    return {
      adaUser: this.username,
      key: this.password,
    };
  }
}
