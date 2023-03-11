import { User } from 'src/user/models/user.model';
import { ConcreteGarden, Observer } from './gardenHelper.service';
import { MqttManager, MQTTSubscriber } from './mqtt.service';

export class GardenBuilder {
  public gardenName: string;
  public gardenId: number;
  public gardenDesc: string;
  public Owner!: User;
  public subscribers!: Observer[];
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
  setObserverList(subscribers: Observer[]): GardenBuilder {
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
  build(): ConcreteGarden {
    return new ConcreteGarden(
      this.gardenName,
      this.gardenDesc,
      this.gardenId,
      this.Owner,
      this.subscribers,
      this.mqttManager,
    );
  }
}
