import { BadRequestException, Injectable } from '@nestjs/common';
import { GroupRepository } from '../database/repositories/group.repository';
import { GroupDocument } from '../database/models/group.model';
import { CrudService } from '../../helpers/crud.service';
import { UpdateGroupDto } from './dto';
import { ObjectId } from '../../helpers/types/objectid.type';

@Injectable()
export class GroupsService extends CrudService<GroupDocument> {
  constructor(readonly groupRepository: GroupRepository) {
    super(groupRepository);
  }

  async createGroup(CreateGroupDto): Promise<GroupDocument> {
    try {
      return await this.groupRepository.create(CreateGroupDto);
    } catch (error) {
      return error.message;
    }
  }

  async findAllActiveGroups() {
    try {
      const query = {
        is_deleted: false,
      }
      return await this.groupRepository.find({query});
    } catch (error) {
      return error.message
    }
  }

  async updateGroupById(groupDto: UpdateGroupDto, groupId: ObjectId) {
    try {
      return await this.groupRepository.updateOne({ _id: groupId.id }, groupDto);
    } catch (error) {
      return error.message;
    }
  }

  async deleteGroupById(groupId: ObjectId) {
    try {
      return await this.groupRepository.deleteOne({ _id: groupId.id });
    } catch (error) {
      return error.message;
    }
  }

}