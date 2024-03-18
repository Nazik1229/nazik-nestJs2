import { IsEmail, IsNotEmpty, IsString, IsStrongPassword} from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class createUserDto {
    @ApiProperty({
        example: 'Jonh Smitt',
        required: true,
    })
    @IsString()
    @IsNotEmpty()
    full_name: string;

    @ApiProperty({
        required: true,
    })
    @IsString()
    @IsNotEmpty()
    password: string;

    @ApiProperty({
        example: 'teglnaz@gmail.com',
        required: true,
    })
    @IsString()
    @IsNotEmpty()
    @IsEmail()
    email: string
}