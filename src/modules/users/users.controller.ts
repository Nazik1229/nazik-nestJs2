
import {
  Controller,
  Post,
  Body,
  Put,
  Query,
  Param,
  Delete,
  Get,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { UpdateUserDto } from './dto';
import { ObjectId } from '../../helpers/types/objectid.type';
import { find } from 'rxjs';


@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({ summary: 'Изменить данные юзера по айдишке юзера' })
  @Put(':id')
  @ApiParam({ name: 'id', type: 'string', required: true })
  async updateUser(
    @Body() updateUserDto: UpdateUserDto,
    @Param() userId: ObjectId,
  ) {
    return await this.usersService.updateUserById(updateUserDto, userId);
  }

  @ApiOperation({ summary: 'Удалить пользователя по айди' })
  @Delete(':id')
  @ApiParam({ name: 'id', type: 'string', required: true })
  async deleteUserById(@Param() userId: ObjectId) {
    return await this.usersService.deleteUserById(userId);
  }

  @ApiOperation({ summary: 'Получить одного пользователя по айди' })
  @Get(':id')
  @ApiParam({ name: 'id', type: 'string', required: true })
  async getUserById(@Param() userId) {
    console.log(userId);
    return await this.usersService.findById(userId.id);
  }

  @ApiOperation({ summary: 'Получить всех ативных пользователей' })
  @Get('all')
  async getAllUsers() {
    return await this.usersService.findAllActiveUsers();
  }
}
