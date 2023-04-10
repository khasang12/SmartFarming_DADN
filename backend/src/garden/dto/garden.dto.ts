import { ApiProperty } from "@nestjs/swagger";

export class Garden {
  @ApiProperty({ description: 'Garden name', example: 'Garden 1' })
  name: string;

  @ApiProperty({
    description: 'Garden Description',
    example: 'This garden is very nice',
  })
  desc: string;

  @ApiProperty({
    description:
      'Boundary of the garden, it includes of a set of tuple of 2 points (lat,lng)',
    example: [
      { lat: 21.4, lng: 80.5 },
      { lat: 45.6, lon: 78.5 },
    ],
  })
  boundary: [{ latitude: number; longitude: number }];

  @ApiProperty({ description: 'Group key', example: 'group1' })
  group_key: string;

  @ApiProperty({ description: 'Group name', example: 'group1' })
  group_name: string;

  @ApiProperty({
    description: 'A list of sensor ID that this garden has',
    example: ['64097719886f65c0228f214f'],
  })
  topic_list: {
    sensor: string[];
    fan: string[];
    motor: string[];
    pump: string[];
  };
}