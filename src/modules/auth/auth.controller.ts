import { Controller, Post, Body, Get, UseGuards, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserDocument } from '../database/models/user.model';
import { createUserDto } from './dto/create-user.dto';
import { loginUserDto } from './dto/login-user.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { LocalAuthGuard } from './guards/local-auth.guard';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: 'Регистрация '})
  @Post('signup')
  async signUp(@Body() userData: createUserDto): Promise<UserDocument> {
    return await this.authService.signup(userData);
  }

  @ApiOperation({ summary: 'Логин '})
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Body() userData: loginUserDto, @Req() req) {
    return await this.authService.login(userData, req.user);
  }
}
