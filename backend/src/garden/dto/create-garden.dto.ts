import { Garden } from "./garden.dto";


export class CreateGardenDTO extends Garden {
  userId: string;
  adaUserName: string;
  x_aio_key: string;
  group_key: string;
  group_name: string;
  topic_list: {
    sensor: string[];
    fan: string[];
    motor: string[];
    pump: string[];
  };
  thresholds: number[];
  boundary: [{ latitude: number; longitude: number }];
}