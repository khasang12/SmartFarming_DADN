import { GardenService } from './garden.service';
import { Controller, Body, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { CreateGarden } from './dto/create-garden.dto';
import { UpdateGarden } from './dto/update-garden.dto';


@Controller('garden')
export class GardenController {
    constructor (private readonly gardenService: GardenService) {}

    @Get()
    async index(){
        return await this.gardenService.findAll();
    }

    @Get(':id')
    async show(@Param('id') id: string){
        return await this.gardenService.findOne(id);
    }

    @Post()
    async create(@Body() createGarden: CreateGarden){
        return await this.gardenService.create(createGarden);
    }

    @Put(':id')
    async update(@Param('id') id: string, @Body() updateGarden: UpdateGarden){
        return await this.gardenService.update(id, updateGarden);
    }

    @Delete(':id')
    async delete(@Param('id') id: string){
        return await this.gardenService.delete(id);
    }
}
