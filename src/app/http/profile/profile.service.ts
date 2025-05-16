import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'database/entities/user.entity';
import { Repository } from 'typeorm';
import { hash } from 'argon2';
import { UpdateProfileDto } from 'src/app/validator/pickup/users.dto';

@Injectable()
export class ProfileService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>
  ) {}

  async updateProfile(id: string, dto: UpdateProfileDto): Promise<User> {
    const user = await this.updateUser({...dto, id:id});
    return user;
  }

  async updateUser(data:any):Promise<User>{
    const user = await this.userRepository.save(data);
    return user;
  }

  async findUser(condition:any):Promise<User | null>{
    const user = await this.userRepository.findOne({where:condition});
    return user || null;
  }
}
