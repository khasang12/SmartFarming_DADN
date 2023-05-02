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
  Inject,
  Query,
  InternalServerErrorException,
} from '@nestjs/common';
import { CreateGardenDTO } from './dto/create-garden.dto';
import { UpdateGarden } from './dto/update-garden.dto';

import { User } from 'src/user/models/user.model';
import { ConcreteGarden } from './garden-helper';
import { GardenBuilder } from './garden-builder';
import { GardenManagerService } from './garden-manager';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiResponse,
} from '@nestjs/swagger/dist';

import { controlDTO } from './dto/control.dto';
import { UserService } from 'src/user/user.service';
import { SensorService } from 'src/sensor/sensor.service';
import { MqttService } from 'src/mqtt/mqtt.service';
import { ActivateDTO } from './dto/actviate.dto';
import { Garden } from './models/garden.model';
import { GardenBusinessErrors } from './error/GardenBusinessError';
import { log } from 'console';
import { type } from 'os';

@Controller('garden')
export class GardenController {
  @Inject(SensorService)
  private sensorService: SensorService;
  constructor(
    private readonly gardenService: GardenService,
    private readonly userService: UserService,
    private readonly mqttService: MqttService,
  ) {}

  @Get()
  @ApiOkResponse({ description: 'Get all gardens successfully' })
  @ApiBadRequestResponse({ description: 'Get all gardens failed' })
  async index(@Query() query: { userId: string }) {
    return await this.gardenService.findAllByUserId(query);
  }

  @ApiOkResponse({ description: 'Get garden successfully' })
  @ApiBadRequestResponse({ description: 'Get garden failed' })
  @Get(':id')
  async show(@Param('id') id: string) {
    return await this.gardenService.findOne(id);
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

  @ApiCreatedResponse({ description: 'Create Garden Successfully' })
  @ApiBadRequestResponse({ description: 'Create Garden Failed' })
  @Post('create')
  async create(@Body() payload: CreateGardenDTO) {
    console.log(payload);
    
    // call DB to get user info
    const gardenName = payload.name;
    let owner: User = await this.userService.findOne(payload.userId);
    // check if garden is created
    let exist:any
    try {
      exist = GardenManagerService.findGarden(gardenName, owner);   
    }
    catch(e) {

    }
    console.log(exist);
    if (exist && exist.hasOwnProperty("gardenId")) {
      throw new InternalServerErrorException(GardenBusinessErrors.ExistedGarden(exist.gardenId))  
    }
    const gkey = payload.group_key;
    const topic_list = payload.topic_list;
    const userList = [];
    const username = payload.adaUserName;
    const x_aio_key = payload.x_aio_key;

    this.gardenService.create({
      adaUserName: payload.adaUserName,
      boundary: payload.boundary,
      desc: payload.desc,
      group_key: payload.group_key,
      group_name: payload.group_name,
      name: payload.name,
      thresholds: payload.thresholds,
      topic_list: {
        sensor: payload.topic_list.sensor,
        fan: payload.topic_list.fan,
        motor: payload.topic_list.motor,
        pump: payload.topic_list.pump,
      },
      userId: owner['_id'],
      x_aio_key: payload.x_aio_key,
    });

    const mqttManager = this.mqttService.getManager(username, x_aio_key);
    for (let k in topic_list) {
      mqttManager.addSubcriber(k, topic_list[k].map(elem => payload.group_key+"/feeds/"+elem), k === "sensor" ? payload.thresholds: [0,1]);
    }
    // Build Garden
    const garden: ConcreteGarden = new GardenBuilder()
      .setGroupKey(gkey)
      .setGardenName(gardenName)
      .setId(GardenManagerService.getCurrentNumber())
      .setOwner(owner)
      .setMQTTDevices(mqttManager)
      .setObserverList([])
      .build();
    garden.launch();
    GardenManagerService.addGarden(garden);
    return {
      status: 'Create Garden Successfully',
      gardenId: 0,
    };
  }

  @Get('get/:id')
  getGarden(@Param('id') id: number) {
    const garden: ConcreteGarden = GardenManagerService.getGarden(id);
    if (garden === undefined)
      return {
        error: 'Garden Not Exist',
      };
    return {
      name: garden.gardenName,
      id: garden.gardenId,
    };
  }

  @ApiCreatedResponse({ description: 'Create Garden Successfully' })
  @ApiBadRequestResponse({ description: 'Create Garden Failed' })
  @Post('/publish')
  control(@Body() payload: controlDTO) {
    let garden: ConcreteGarden = GardenManagerService.getGarden(
      payload.gardenID,
    );
    return garden
      .getMqttManager()
      .publish(payload.type, payload.feeds_key, payload.value);
  }

  @Post('activate')
  async activate(@Body('gardenId') gardenId: string, @Body('pushToken') pushToken: string) {
    const garden:Garden = await this.gardenService.findOne(gardenId)
    try {
      const g = GardenManagerService.findGarden(garden.name, garden.userId[0]);
      const gid = g.gardenId;
      const activeGarden:ConcreteGarden = GardenManagerService.getGarden(gid);
      activeGarden.subcribe(pushToken);  
    } catch (e) {
      const owner:User = await this.userService.findOne(garden.userId[0].toString())
      const mqttManager = this.mqttService.getManager(garden.adaUserName, garden.x_aio_key);
      for (let k in garden.topic_list) {
        await mqttManager.addSubcriber(k, garden.topic_list[k].map(elem => garden.group_key+"/feeds/"+elem),k === "sensor" ? garden.thresholds : [0,1]);
      }
      // Build Garden
      const activateGarden: ConcreteGarden = new GardenBuilder()
        .setGroupKey(garden.group_key)
        .setGardenName(garden.name)
        .setId(GardenManagerService.getCurrentNumber())
        .setOwner(owner)
        .setMQTTDevices(mqttManager)
        .setObserverList([pushToken])
        .build();
      activateGarden.launch();
      GardenManagerService.addGarden(activateGarden);
    }

  }
}
