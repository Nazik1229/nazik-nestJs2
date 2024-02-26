import { IsEmail, IsNotEmpty, IsString, IsStrongPassword } from 'class-validator'

export class createUserDto {
    @IsString()
    @IsNotEmpty()
    full_name: string;

    @IsString()
    @IsNotEmpty()
    password: string;

    @IsString()
    @IsNotEmpty()
    @IsEmail()
    email: string
}