import { IsNotEmpty, IsString} from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class createGroupDto {
    @ApiProperty({
        example: 'CS-4',
        required: true,
    })
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty({
        example: 'Описание',
        required: true,
    })
    @IsString()
    @IsNotEmpty()
    description: string;
}