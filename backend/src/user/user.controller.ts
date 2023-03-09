import { Controller, Body, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUser } from './dto/create-user.dto';
import { UpdateUser } from './dto/update-user.dto';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get()
    async index(){
        return await this.userService.findAll();
    }

    @Get(':id')
    async show(@Param('id') id: string){
        return await this.userService.findOne(id);
    }

    @Post()
    async create(@Body() createUser: CreateUser){
        return await this.userService.create(createUser);
    }

    @Put(':id')
    async update(@Param('id') id: string, @Body() updateUser: UpdateUser){
        return await this.userService.update(id, updateUser);
    }

    @Delete(':id')
    async delete(@Param('id') id: string){
        return await this.userService.delete(id);
    }
}
