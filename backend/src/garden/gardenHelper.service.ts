import { User } from 'src/user/models/user.model';
import { MqttManager, MQTTSubscriber } from './mqtt.service';

interface Subject {
  subcribe(observer: Observer): void;
  unsubcribe(observer: Observer): void;
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
    public gardenId : number,
    private Owner: User,
    private observers: Observer[],
    private mqttManager: MqttManager,
  ) {};

  subcribe(observer: Observer): void {
    this.observers.push(observer);
  }
  unsubcribe(observer: Observer): void {
    this.observers = this.observers.filter((ele) => ele.id !== observer.id);
  }
  notify(news: string): void {
    this.observers.forEach((observer) => observer.update(news));
  }
  /* devices : [MQTTSubcriber] */
  addDevice(topic: string[], type:string) {
    return;
  } 
  launch() {
    this.mqttManager.launch();
  }
}

export class Observer extends User {
  constructor(public id: string, public name: string) {
    super();
  }
  update(news: string): void {
    console.log('New Feeds');
  }
}
