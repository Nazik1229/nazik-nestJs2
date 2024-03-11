import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { createUserDto } from './dto/create-user.dto';
import { UserDocument } from '../database/models/user.model';
import { JwtService } from '@nestjs/jwt';
import { access } from 'fs';
import { loginUserDto } from './dto/login-user.dto';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UsersService,
        private jwtService: JwtService,
    ) {}
    async signup(userData: createUserDto): Promise<UserDocument> {
        try {
           const user = await this.userService.create(userData); 
           if (user) {
            return user;
           }
        } catch (err) {
            return err
        }
    }

    async validateUser(login: string, password: string): Promise<any> {
        try {
          const user = await this.userService.findOne({ login, password });
          if (!user) {
            return null;
          }
          return user;
        } catch (error) {
          return error.data;
        }
    }

    login(userData: loginUserDto, user: UserDocument) {
        const { email } = userData;
        const payload = { email, user_id: user._id };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }
}