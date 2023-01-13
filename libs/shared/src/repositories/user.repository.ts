import { Injectable } from '@nestjs/common';
import { BaseAbstractRepository } from '@app/shared/repositories/base/base.abstract.repository';
import { UserEntity } from '@app/shared';
import { UserRepositoryInterface } from '@app/shared/interfaces/user.repository.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UserRepository
  extends BaseAbstractRepository<UserEntity>
  implements UserRepositoryInterface
{
  constructor(
    @InjectRepository(UserRepository)
    private readonly UserRepository: Repository<UserEntity>,
  ) {
    super(UserRepository);
  }
}
