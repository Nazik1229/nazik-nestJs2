import { Controller, Post, Body, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
  
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('signup')
    async signUp(@Body() userData) {
        console.log(userData);
        return await this.authService.signup(userData)
    }
}