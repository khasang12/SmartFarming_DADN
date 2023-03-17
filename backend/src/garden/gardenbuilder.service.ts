import { Inject } from '@nestjs/common';
import { User } from 'src/user/models/user.model';
import { GardenService } from './garden.service';
import { ConcreteGarden, Observer } from './gardenHelper.service';
import { MqttManager, MQTTSubscriber } from './mqtt.service';

export class GardenBuilder {
  public gardenName: string;
  public gardenId: number;
  public gardenDesc: string;
  public groupKey: string;
  public Owner!: User;
  public subscribers!: Observer[];
  public mqttManager!: MqttManager;
  @Inject(GardenService.name) gardenService: GardenService;
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
  setGroupKey(gkey: string) {
    this.groupKey = gkey;
    return this;
  }
  build(): ConcreteGarden {
    
    this.gardenService.create({
      adaUserName: this.mqttManager.getInfo().username,
      boundary: [{ lat: 0, lng: 0 }],
      desc: this.gardenDesc,
      group_key: this.groupKey,
      name: this.gardenName,
      sensors: [],
      topic_list: [],
      userId: this.Owner['_id'],
      x_aio_key: this.mqttManager.getInfo().key
    });

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
