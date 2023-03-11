import { User } from 'src/user/models/user.model';
import { ConcreteGarden,Observer } from './gardenHelper.service';
import { MqttManager, MQTTSubscriber } from './mqtt.service';

export class GardenBuilder {
  public Owner!: User;
  public subscribers!: Observer[];
  public mqttManager!: MqttManager;
  constructor() {
    this.Owner = null;
    this.subscribers = [];
    this.mqttManager = null;
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
  build(): ConcreteGarden {
    return new ConcreteGarden(this.Owner, this.subscribers, this.mqttManager);
  }
}
