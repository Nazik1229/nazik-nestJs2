import { BadRequestException, Injectable } from '@nestjs/common';
import { UserRepository } from '../database/repositories/user.repository';
import { UserDocument } from '../database/models/user.model';
import { CrudService } from '../../helpers/crud.service';
import { UpdateUserDto } from './dto';
import { ObjectId } from '../../helpers/types/objectid.type';

@Injectable()
export class UsersService extends CrudService<UserDocument> {
  constructor(readonly userRepository: UserRepository) {
    super(userRepository);
  }

  async createUser(CreateUserDto): Promise<UserDocument> {
    try {
      return await this.userRepository.create(CreateUserDto);
    } catch (error) {
      return error.message;
    }
  }

  async findOneUserByEmail(email: string) {
    try {
      return await this.userRepository.findOne({ email })
    } catch (error) {
      
    }
  }

  async findUser(CreateUserDto) {
    try {
      return await this.userRepository.findOne({CreateUserDto});
    } catch (error) {
      return error.message
    }
  }

  async findAllActiveUsers() {
    try {
      const query = {
        is_deleted: false,
      }
      return await this.userRepository.find({query});
    } catch (error) {
      return error.message
    }
  }

  async updateUserById(userDto: UpdateUserDto, userId: ObjectId) {
    try {
      return await this.userRepository.updateOne({ _id: userId.id }, userDto);
    } catch (error) {
      return error.message;
    }
  }

  async deleteUserById(userId: ObjectId) {
    try {
      return await this.userRepository.deleteOne({ _id: userId.id });
    } catch (error) {
      return error.message;
    }
  }

}
