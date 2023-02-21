import { HttpService } from '@nestjs/axios';
import { Controller, Get, Injectable, Post } from '@nestjs/common';
import axios from 'axios';

@Injectable()
@Controller('sensor')
export class SensorController {
  constructor(private readonly http: HttpService) {}
  @Get()
  public async getFeed() {
    const url =
      'https://io.adafruit.com/api/v2/Potato_Stack/feeds/iot-cnpm.sensor1';
    const res = await fetch(url);
    return res.json();
  }
  @Post()
  public onlyFans() {
    const data = {
      value: 0,
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

  @Get('data')
  public async getData() {
    const url =
      'https://io.adafruit.com/api/v2/Potato_Stack/feeds/iot-cnpm.sensor1/data';
    const res = await fetch(url);
    return res.json();
  }
}
