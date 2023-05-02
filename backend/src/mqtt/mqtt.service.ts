import { Inject, Injectable } from '@nestjs/common';
import axios from 'axios';
import { connect } from 'mqtt';
import { SensorService } from 'src/sensor/sensor.service';

@Injectable()
export class MqttService {
  @Inject(SensorService)
  private readonly sensorService: SensorService;
  getManager(username: string, password: string) {
    return new MqttManager(username, password, this.sensorService);
  }
}
const getMinMaxThreshold = (typ: string, thresholds: number[]) => {
  if (typ.includes('Temp')) {
    return [thresholds[0], thresholds[1]];
  } else if (typ.includes('Humid')) {
    return [thresholds[2], thresholds[3]];
  } else if (typ.includes('Light')) {
    return [thresholds[4], thresholds[5]];
  } else {
    return [thresholds[6], thresholds[7]];
  }
};
export class MQTTSubscriber {
  public mqttClient;
  public static cb; // Call back notify function
  // @Inject(SensorService)
  // protected readonly sensorService: SensorService

  constructor(
    protected topic: string[],
    protected thresholds: number[],
    protected username: string,
    protected password: string,
    protected sensorService: any,
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
  setThreshHold(thresholds: number[]) {
    this.thresholds = thresholds;
  }
}

export class SensorSubcriber extends MQTTSubscriber {
  private topicWithType: any[];
  constructor(
    topicWithType: any[],
    thresholds,
    username,
    password,
    sensorService,
  ) {
    super(
      topicWithType.map((elem) => elem.feed),
      thresholds,
      username,
      password,
      sensorService,
    );
    this.topicWithType = topicWithType;
  }
  launch() {
    this.mqttClient.on('connect', () => {
      console.log('Connected');
      this.mqttClient.subscribe(this.topic, () => {
        console.log(`Subscribe to topic '${this.topic}'`);
      });
    });
    this.mqttClient.on('message', (topic: string, payload: any) => {
      console.log(topic, payload);
      
      if (topic.includes('/auto')) {
        this.thresholds = payload.toString().split(' ');
        MQTTSubscriber.cb(
          topic,
          `Thresh holds update: ${this.thresholds.join(' ')}`,
        );
        this.sensorService.create({
          desc: '',
          feed_key: topic,
          last_update: new Date(),
          name: 'Thresholds Update',
          status: true,
          type: 'sensor',
          value: parseInt(this.thresholds.join(' ')),
        });
      } else {
        const typ = this.topicWithType.find((elem) => elem.feed == topic).type;
        const threshold = getMinMaxThreshold(typ, this.thresholds);
        const value = parseInt(payload.toString());        
        if (value < threshold[0] || value > threshold[1]) {
          MQTTSubscriber.cb(
            topic,
            `${typ} sensor too ${value < threshold[0] ? "Low" : "High"} - ${topic} - ${payload.toString()}`,
          );
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
        }
      }
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
      MQTTSubscriber.cb(
        topic,
        `Pump ${topic}: ${payload.toString() == '1' ? 'ON' : 'OFF'}`,
      );
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
      MQTTSubscriber.cb(
        topic,
        `Fan ${topic}: ${payload.toString() == '1' ? 'ON' : 'OFF'}`,
      );
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
      MQTTSubscriber.cb(
        topic,
        `Motor ${topic}: ${payload.toString() == '1' ? 'ON' : 'OFF'}`,
      );
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

class SubcriberFactory {
  async createSubcriber(
    type: string,
    topic: string[],
    thresholds: number[],
    username: string,
    password: string,
    sensorService,
  ): Promise<MQTTSubscriber> {
    if (type === 'sensor') {
      // Factory Pattern
      const promiseArray = topic.map((elem) =>
        axios.get('https://io.adafruit.com/api/v2/' + elem),
      );
      let topicWithType;
      await Promise.all(promiseArray)
        .then((response) => {
          topicWithType = topic.map((elem, i) => {
            let data:string;
            if (response[i].data.name.includes('temperature')) data = 'Temp';
            else if (response[i].data.name.includes('humidity')) data = 'Humid';
            else if (response[i].data.name.includes('light')) data = 'Light';
            else data = ""
            return {
              feed: elem,
              type: data,
            };
          });
          return topicWithType;
        })
        .catch((err) => {
          console.log(err);
        });
      return new SensorSubcriber(
        topicWithType,
        thresholds,
        username,
        password,
        sensorService,
      );
    } else if (type === 'pump') {
      return new PumpSubcriber(
        topic,
        thresholds,
        username,
        password,
        sensorService,
      );
    } else if (type === 'motor') {
      return new MotorSubcriber(
        topic,
        thresholds,
        username,
        password,
        sensorService,
      );
    } else if (type === 'fan') {
      return new FanSubcriber(
        topic,
        thresholds,
        username,
        password,
        sensorService,
      );
    }
    return null;
  }
}

export class MqttManager {
  private Subcribers;
  private notifyFunction;
  constructor(
    private username: string,
    private password: string,
    private sensorService: any,
  ) {
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
  async addSubcriber(type: string, topic: string[] = [], thresholds: number[]) {
    const newSubscriber: MQTTSubscriber =
      await new SubcriberFactory().createSubcriber(
        type,
        topic,
        thresholds,
        this.username,
        this.password,
        this.sensorService,
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
