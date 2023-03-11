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

  // Wrap this function as callback and pass to Subcribers --> becasue this context
  notify = ((payload) => {
    if(this.observers)
      this.observers.forEach((observer) => observer.update(payload));
  }).bind(this);


  /* devices : [MQTTSubcriber] */
  addDevice(topic: string[], type:string) {
    return;
  } 
  launch() {
    this.subcribe(new Observer(this.Owner))
    this.mqttManager.setNotify(this.notify);
    this.mqttManager.launch();
  }

}

export class Observer extends User {
  public static count = 0;
  public id;
  constructor(user:User) {
    super()
    super.name = user.name;
    super.password = user.password;
    //.......
    this.id = Observer.count++;
  }
  update(payload: any): void {
    console.log(`${this.name} Receive Message: ${payload.toString()}`);
  }
}
