import { ApiInternalServerErrorResponse } from '@nestjs/swagger';
import axios from 'axios';
import { MqttManager } from 'src/mqtt/mqtt.service';
import { User } from 'src/user/models/user.model';
import { GardenBusinessErrors } from './error/GardenBusinessError';
import { InternalServerErrorException } from '@nestjs/common';
interface Subject {
  subcribe(observer: string): void;
  unsubcribe(observer: string): void;
  notify(news: string): void;
}
/* 
A Garden Contain:
- List of users --> Done
- List of devices --> Done
- An crawler to get data from adafruits and update into Database --> Done
- An SSE to for notification
*/
export class ConcreteGarden implements Subject {
  constructor(
    public gardenName: string,
    public gardenDesc: string,
    public gardenId: number,
    private groupKey: string,
    private Owner: User,
    private observers: string[],
    private mqttManager: MqttManager,
  ) {}
  subcribe(pushToken: string): void {
    if (!pushToken) {
      throw new InternalServerErrorException(GardenBusinessErrors.InvalidPushToken(pushToken));
    }
    if(!this.observers.includes(pushToken))
      this.observers.push(pushToken);
  }
  unsubcribe(pushToken : string): void {
    this.observers = this.observers.filter(ele => ele != pushToken);
  }
  // Wrap this function as callback and pass to Subcribers --> becasue this context
  notify = ((title:string,payload:string) => {
    console.log(this.gardenName);
    
    axios.post(
      "https://exp.host/--/api/v2/push/send",
      {
        to: this.observers,
        sound: "default",
        title: this.gardenName,
        body: payload
      }
    ).catch((err) => {
      console.log(err);
    });
  }).bind(this);

  /* devices : [MQTTSubcriber] */
  addDevice(topic: string[], type: string) {
    return;
  }
  getMqttManager() {
    return this.mqttManager;
  }
  launch() {
    this.mqttManager.setNotify(this.notify);
    this.mqttManager.launch();
  }
}


