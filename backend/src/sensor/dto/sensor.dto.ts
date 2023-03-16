import { ApiProperty } from "@nestjs/swagger/dist";

export class Sensor {
    @ApiProperty({ description: 'Sensor name', example: 'Sensor 1' })
    name: string;

    @ApiProperty({ description: 'Sensor feed key', example: 'feed_key' })
    feed_key: string;

    @ApiProperty({ description: 'Sensor type', example: 'temperature' })
    type: string;

    @ApiProperty({ description: 'Sensor status', example: true })
    status: boolean;

    @ApiProperty({ description: 'Sensor value', example: 20 })
    value: number;

    @ApiProperty({ description: 'Sensor last update', example: new Date() })
    last_update: Date;

    @ApiProperty({ description: 'Sensor description', example: 'This sensor is very nice' })
    desc: string;
}