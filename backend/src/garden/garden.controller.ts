/* eslint-disable prefer-const */
import { GardenService } from './garden.service';
import {
  Controller,
  Body,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { CreateGarden } from './dto/create-garden.dto';
import { UpdateGarden } from './dto/update-garden.dto';
import { MqttManager } from './mqtt.service';
import { User } from 'src/user/models/user.model';
import { ConcreteGarden } from './gardenHelper.service';
import { GardenBuilder } from './gardenbuilder.service';
import { GardenManagerService } from './gardenManager.service';
import { ApiBadRequestResponse, ApiCreatedResponse, ApiOkResponse } from '@nestjs/swagger/dist';

@Controller('garden')
export class GardenController {
  constructor(private readonly gardenService: GardenService) {}

  @Get()
  @ApiOkResponse({ description: 'Get all gardens successfully' })
  @ApiBadRequestResponse({ description: 'Get all gardens failed' })
  async index() {
    return await this.gardenService.findAll();
  }

  @ApiOkResponse({ description: 'Get garden successfully' })
  @ApiBadRequestResponse({ description: 'Get garden failed' })
  @Get(':id')
  async show(@Param('id') id: string) {
    return await this.gardenService.findOne(id);
  }

  @Post()
  @ApiCreatedResponse({ description: 'Create Garden Successfully' })
  @ApiBadRequestResponse({ description: 'Create Garden Failed' })
  async create(@Body() createGarden: CreateGarden) {
    return await this.gardenService.create(createGarden);
  }

  @ApiOkResponse({ description: 'Update garden successfully' })
  @ApiBadRequestResponse({ description: 'Update garden failed' })
  @Put(':id')
  async update(@Param('id') id: string, @Body() updateGarden: UpdateGarden) {
    return await this.gardenService.update(id, updateGarden);
  }

  @ApiOkResponse({ description: 'Delete garden successfully' })
  @ApiBadRequestResponse({ description: 'Delete garden failed' })
  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.gardenService.delete(id);
  }

  
  @Get('test/mqtt')
  test() {
    const username = 'davidhuynh22';
    const password = 'aio_bycn1154ctLCUtXTwnacwJafCeWm';
    const topic = [
      'Potato_Stack/feeds/iot-cnpm.button1',
      'Potato_Stack/feeds/iot-cnpm.button2',
    ];

    const mqttManager = new MqttManager(username, password)
      .addSubcriber('fan', topic)
      .addSubcriber('motor');

    mqttManager.launch();
  }

  @Get('test/createGarden')
  testGardenCreate() {
    const topic = [
      'Potato_Stack/feeds/iot-cnpm.button1',
      'Potato_Stack/feeds/iot-cnpm.button2',
    ];

    /* Call API must include 
        - gardenName:
        - description:
        - group_key
        -  ownerID --> To call DB to get UserInfo
        -  userList = [] --> List of workers participate in garden
        -  topic_list --> {
          "sensor" : [
            'Potato_Stack/feeds/iot-cnpm.button1',
            'Potato_Stack/feeds/iot-cnpm.button2',
          ],
          "fan" : [],
          "pump" : [],
          "motor" : [],
        }
        *boundary[]
      */

    // call DB to get user info
    const gardenName = 'Hello World';
    const desc = 'Init Garden';
    const owner: User = {
      name: 'davidhuynh22',
      email: 'aio_bycn1154ctLCUtXTwnacwJafCeWm',
      password: '123456',
      phone: '123456',
      create_at: new Date(),
      gardens: [],
    };

    const owner_x_aio_key = 'aio_bycn1154ctLCUtXTwnacwJafCeWm';
    const topic_list = {
      sensor: [
        'Potato_Stack/feeds/iot-cnpm.button1',
        'Potato_Stack/feeds/iot-cnpm.button2',
      ],
      fan: [],
      pump: [],
      motor: [],
    };
    const userList = [];

    /* Constructing Garden */
    // Create mqttManager
    const mqttManager = new MqttManager(owner.name, owner_x_aio_key);
    for (let k in topic_list) {
      mqttManager.addSubcriber(k, topic_list[k]);
    }
    // Build Garden
    const garden: ConcreteGarden = new GardenBuilder()
      .setGardenName(gardenName)
      .setId(GardenManagerService.getCurrentNumber())
      .setOwner(owner)
      .setMQTTDevices(mqttManager)
      .setObserverList(userList)
      .build();
    garden.launch();
    GardenManagerService.addGarden(garden);
    return {
        "status": "Create Garden Successfully"
    }
  }

  @Get('test/get/:id')
  getGarden(@Param('id') id: number) {
    const garden: ConcreteGarden = GardenManagerService.getGarden(id);
    if(garden === undefined)
        return {
            "error" : "Garden Not Exist" 
        }
    return {
      name: garden.gardenName,
      id: garden.gardenId, 
    };
  }
}
