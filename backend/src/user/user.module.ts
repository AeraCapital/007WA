import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { User } from './entities/user.entity';
import { UserRepository } from './repositories/user.repository';

@Module({
  imports: [ TypeOrmModule.forFeature([ User, UserRepository ]) ],
  providers: [ UserService ],
  controllers: [ UserController ],
  exports: [ TypeOrmModule, UserService ], // export TypeOrmModule

})
export class UserModule { }