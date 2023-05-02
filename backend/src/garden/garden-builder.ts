import { MqttManager } from 'src/mqtt/mqtt.service';
import { User } from 'src/user/models/user.model';
import { ConcreteGarden } from './garden-helper';

export class GardenBuilder {
  public gardenName: string;
  public gardenId: number;
  public gardenDesc: string;
  public groupKey:string;
  public Owner!: User;
  public subscribers!: string[];
  public mqttManager!: MqttManager;
  constructor() {
    this.Owner = null;
    this.subscribers = [];
    this.mqttManager = null;
    return this;
  }
  setOwner(Owner: User): GardenBuilder {
    this.Owner = Owner;
    return this;
  }
  setstringList(subscribers: string[]): GardenBuilder {
    this.subscribers = subscribers;
    return this;
  }
  setMQTTDevices(mqttManager: MqttManager): GardenBuilder {
    this.mqttManager = mqttManager;
    return this;
  }
  setId(id: number) {
    this.gardenId = id;
    return this;
  }
  setGardenName(name: string) {
    this.gardenName = name;
    return this;
  }
  setGardenDesc(desc: string) {
    this.gardenDesc = desc;
    return this;
  }
  setGroupKey(gkey : string) {
    this.groupKey = gkey;
    return this;
  }
  setObserverList(pushTokenList: string[]) {
    this.subscribers = pushTokenList
    return this;
  }
  build(): ConcreteGarden {
    return new ConcreteGarden(
      this.gardenName,
      this.gardenDesc,
      this.gardenId,
      this.groupKey,
      this.Owner,
      this.subscribers,
      this.mqttManager,
    );
  }
}
