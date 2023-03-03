import { HttpService } from '@nestjs/axios';
import { Controller, Get, Injectable, Post, UseGuards, Param, Body } from '@nestjs/common';
import axios from 'axios';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
class DeviceDTO {
  feed_key:string
}
@Injectable()
@Controller('sensor')
export class SensorController {
  constructor(private readonly http: HttpService) {}
 
  @UseGuards(JwtAuthGuard)
  @Get()
  public async getFeed() {
    const url =
      'https://io.adafruit.com/api/v2/Potato_Stack/feeds/iot-cnpm.sensor1';
    const res = await fetch(url);
    return res.json();
  }

  @UseGuards(JwtAuthGuard)
  @Post('device/fan/control')
  public onlyFans(state: number) {
    const data = {
      value: state,
    };
    const config = {
      headers: {
        'X-AIO-Key': 'aio_bycn1154ctLCUtXTwnacwJafCeWm',
      },
    };
    axios.post(
      'https://io.adafruit.com/api/v2/Potato_Stack/feeds/iot-cnpm.button1/data',
      data,
      config,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Post('device/')
  public async getDeviceData(@Body() body:DeviceDTO) {
    const url =
      `https://io.adafruit.com/api/v2/Potato_Stack/feeds/${body.feed_key}/data`;
    console.log(url);
    const res = await fetch(url);
    return res.json();
  }
}
