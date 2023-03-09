import { MqttClient } from "mqtt";
import { MQTTSubcribers } from "./mqtt.service";

interface Subject {
  subcribe(observer: Observer): void;
  unsubcribe(observer: Observer): void;
  notify(news: string): void;
}

interface IObserver {
  update(news: string): void;
}
/* 
A Garden Contain:
- List of users
- List of devices
- An crawler to get data from adafruits and update into Database
- An SSE to for notification
*/

class ConcreteGarden implements Subject {
  private observers: Observer[]; //List of User ID
  private crawlers: MQTTSubcribers[];
  
  subcribe(observer: Observer): void {
    this.observers.push(observer);
  }
  unsubcribe(observer: Observer): void {
    this.observers = this.observers.filter((ele) => ele.id === observer.id);
  }
  notify(news: string): void {
    this.observers.forEach((observer) => observer.update(news));
  }
}


class Observer implements IObserver {
  constructor(public id: string, public name: string) {}
  update(news: string): void {
    console.log('New Feeds');
  }
}


