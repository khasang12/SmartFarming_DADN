import { Garden } from "./garden.dto";


export class CreateGardenDTO extends Garden {
    userId : string;
    adaUserName: string;
    topic_list: [];
    x_aio_key: string;
}