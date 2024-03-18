
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
  import { GroupsService } from './groups.service';
  import { ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
  import { UpdateGroupDto } from './dto';
  import { ObjectId } from '../../helpers/types/objectid.type';
  
  
  @ApiTags('Groups')
  @Controller('Groups')
  export class GroupsController {
    constructor(private readonly groupsService: GroupsService) {}
  
    @ApiOperation({ summary: 'Изменить данные группы по айдишке группы' })
    @Put(':id')
    @ApiParam({ name: 'id', type: 'string', required: true })
    async updateGroup(
      @Body() updateGroupDto: UpdateGroupDto,
      @Param() groupId: ObjectId,
    ) {
      return await this.groupsService.updateGroupById(updateGroupDto, groupId);
    }
  
    @ApiOperation({ summary: 'Удалить группу по айди' })
    @Delete(':id')
    @ApiParam({ name: 'id', type: 'string', required: true })
    async deleteGroupById(@Param() groupId: ObjectId) {
      return await this.groupsService.deleteGroupById(groupId);
    }
    
    @ApiOperation({ summary: 'Получить одного пользователя по айди' })
    @Get(':id')
    @ApiParam({ name: 'id', type: 'string', required: true })
    async getGroupsById(@Param() groupId) {
    console.log(groupId);
        return await this.groupsService.findById(groupId.id);
    }

    @ApiOperation({ summary: 'Получить всех ативных пользователей' })
    @Get('all')
    async getAllUsers() {
        return await this.groupsService.findAllActiveGroups();
  }
  }