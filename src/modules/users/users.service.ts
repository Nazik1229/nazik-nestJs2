import { BadRequestException, Injectable } from '@nestjs/common';
import { UserRepository } from '../database/repositories/user.repository';
import { UserDocument } from '../database/models/user.model';
import { CrudService } from '../../helpers/crud.service';
import { createUserDto } from '../auth/dto';

@Injectable()
export class UsersService extends CrudService<UserDocument> {
  constructor(readonly userRepository: UserRepository) {
    super(userRepository);
  }

  async createUser(createUserDto: createUserDto): Promise<UserDocument> {
    try {
      return await this.userRepository.create(createUserDto);
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
}
