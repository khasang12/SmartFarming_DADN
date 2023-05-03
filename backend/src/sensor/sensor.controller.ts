/* eslint-disable prefer-const */
import { HttpService } from '@nestjs/axios';
import {
  Controller,
  Body,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
  Req
} from '@nestjs/common';
import axios from 'axios';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { SensorService } from './sensor.service';
import { CreateSensor } from './dto/create-sensor.dto';
import { UpdateSensor } from './dto/update-sensor.dto';
import { GardenBuilder } from 'src/garden/garden-builder';
import { User } from 'src/user/models/user.model';
import { ConcreteGarden } from 'src/garden/garden-helper';
import { GardenManagerService } from 'src/garden/garden-manager';
import { ApiBadRequestResponse, ApiOkResponse } from '@nestjs/swagger';
import { Latest } from './dto/value.dto';
import { Query } from 'mongoose';
import { Request } from 'express';

class DeviceDTO {
  feed_key: string;
}
//@Injectable()
@Controller('sensor')
export class SensorController {
  constructor(private readonly sensorService: SensorService) {}

  @Get()
  @ApiOkResponse({ description: 'Get all sensors successfully' })
  @ApiBadRequestResponse({ description: 'Get all sensors failed' })
  async index() {
    return await this.sensorService.findAll();
  }

  /* @Get(':id')
  @ApiOkResponse({ description: 'Get sensor successfully' })
  @ApiBadRequestResponse({ description: 'Get sensor failed' })
  async show(@Param('id') id: string) {
    console.log(id)
    return await this.sensorService.findOne(id);
  } */

  @Post('device/latest')
  @ApiOkResponse({ description: 'Get sensor successfully' })
  @ApiBadRequestResponse({ description: 'Get sensor failed' })
  async getLatest(@Body() payload: Latest, @Req() req: Request) {
    const limit: number = parseInt(req.query.limit as string);
    const result = await this.sensorService.findByKey(payload);
    const [newest, first] = [
      limit ? result.slice(0,limit) : result[0],
      result[result.length - 1],
    ];
    if(!first) {
      console.log(payload);
      
    }
    if (!Array.isArray(newest)){
      if (payload.type === 1) return first;
      return {
        name: first.name,
        feed_key: newest.feed_key,
        type: first.type,
        value: newest.value,
        last_update: newest.last_update,
      };
    }
    return newest.map((item) => ({
      name: first.name,
      feed_key: item.feed_key,
      type: first.type,
      value: item.value,
      last_update: item.last_update,
    }));
  }

  @Post()
  @ApiOkResponse({ description: 'Latest Record' })
  @ApiBadRequestResponse({ description: 'Failed' })
  async create(@Body() createSensor: CreateSensor) {
    return await this.sensorService.create(createSensor);
  }

  @Put(':id')
  @ApiOkResponse({ description: 'Update sensor successfully' })
  @ApiBadRequestResponse({ description: 'Update sensor failed' })
  async update(@Param('id') id: string, @Body() updateSensor: UpdateSensor) {
    return await this.sensorService.update(id, updateSensor);
  }

  @Delete(':id')
  @ApiOkResponse({ description: 'Delete sensor successfully' })
  @ApiBadRequestResponse({ description: 'Delete sensor failed' })
  async delete(@Param('id') id: string) {
    return await this.sensorService.delete(id);
  }

  // @UseGuards(JwtAuthGuard)
  // @Get()
  // public async getFeed() {
  //   const url =
  //     'https://io.adafruit.com/api/v2/Potato_Stack/feeds/iot-cnpm.sensor1';
  //   const res = await fetch(url);
  //   return res.json();
  // }

  // @UseGuards(JwtAuthGuard)
  // @Post('device/fan/control')
  // public onlyFans(state: number) {
  //   const data = {
  //     value: state,
  //   };
  //   const config = {
  //     headers: {
  //       'X-AIO-Key': 'aio_bycn1154ctLCUtXTwnacwJafCeWm',
  //     },
  //   };
  //   axios.post(
  //     'https://io.adafruit.com/api/v2/Potato_Stack/feeds/iot-cnpm.button1/data',
  //     data,
  //     config,
  //   );
  // }

  // @UseGuards(JwtAuthGuard)
  // @Post('device/')
  // public async getDeviceData(@Body() body:DeviceDTO) {
  //   const url =
  //     `https://io.adafruit.com/api/v2/Potato_Stack/feeds/${body.feed_key}/data`;
  //   console.log(url);
  //   const res = await fetch(url);
  //   return res.json();
  // }
}
