import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { createUserDto } from './dto/create-user.dto';
import { UserDocument } from '../database/models/user.model';
import { JwtService } from '@nestjs/jwt';
import { access } from 'fs';

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

    async login(userLogin) {
        try {
           const user = await this.userService.findOneUserByEmail(userLogin.email);
           if (user) {
            if (user.password === userLogin.password) {
                const { email } = userLogin;
                const payload = { email };
                return {
                    access_token: this.jwtService.sign(payload),
                };
            }
           } 
           return "Неверные данные для входа";
        } catch (error) {
            return error.message;
        }
        
    }
}