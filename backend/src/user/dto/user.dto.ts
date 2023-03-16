import { ApiProperty } from '@nestjs/swagger';
import { ObjectId } from 'mongodb';

export class User{
    @ApiProperty({description: 'User name',  example: 'Sang Vinh Nguyen'})
    name: string;

    @ApiProperty({description: 'User email', example: 'sang.nguyenvinh@gmail.com'})
    email: string;

    @ApiProperty({description: 'User password', example: '123456'})
    password: string;

    @ApiProperty({description: 'User phone', example: '0123456789'})
    phone: string;

    @ApiProperty({description: 'User create_at', example: new Date()})
    create_at: Date;

    @ApiProperty({description: 'User gardens', example: ['64098068f5b17eca8a433b48']})
    gardens: ObjectId[];
}