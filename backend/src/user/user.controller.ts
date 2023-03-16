import { Controller, Body, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUser } from './dto/create-user.dto';
import { UpdateUser } from './dto/update-user.dto';
import { ApiOkResponse } from '@nestjs/swagger';
import { ApiBadRequestResponse } from '@nestjs/swagger/dist';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}
    @Get()
    @ApiOkResponse({ description: 'Get all users successfully' })
    @ApiBadRequestResponse({ description: 'Get all users failed' })
    async index(){
        return await this.userService.findAll();
    }

    @Get(':id')
    @ApiOkResponse({ description: 'Get user successfully' })
    @ApiBadRequestResponse({ description: 'Get user failed' })
    async show(@Param('id') id: string){
        return await this.userService.findOne(id);
    }


    @Post()
    @ApiOkResponse({ description: 'Create user successfully' })
    @ApiBadRequestResponse({ description: 'Create user failed' })
    async create(@Body() createUser: CreateUser){
        return await this.userService.create(createUser);
    }

    @Put(':id')
    @ApiOkResponse({ description: 'Update user successfully' })
    @ApiBadRequestResponse({ description: 'Update user failed' })
    async update(@Param('id') id: string, @Body() updateUser: UpdateUser){
        return await this.userService.update(id, updateUser);
    }

    @Delete(':id')
    @ApiOkResponse({ description: 'Delete user successfully' })
    @ApiBadRequestResponse({ description: 'Delete user failed' })
    async delete(@Param('id') id: string){
        return await this.userService.delete(id);
    }
}
