import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {hash} from 'argon2'
import { RegisterDto } from 'src/app/validator/auth/auth.dto';
import { User } from 'database/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}
  async register(data:RegisterDto):Promise<User>{
    if(await this.findUser({email:data.email})){
      throw new BadRequestException('Register Failed: User already exists');
    }
    const hashedPassword = await hash(data.password);
    const user = await this.createUser({...data, password:hashedPassword});
    return user;
  }

  async createUser(data:any):Promise<User>{
    const user = await this.userRepository.save(data);
    return user;
  }


  async findUser(condition:any):Promise<User | null>{
    const user = await this.userRepository.findOne({where:condition});
    return user || null;
  }
}
