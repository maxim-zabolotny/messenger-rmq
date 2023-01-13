import { ConflictException, Inject, Injectable } from '@nestjs/common';
import { NewUserDTO } from './dtos/newUser.dto';
import * as bcrypt from 'bcrypt';
import { UserRepositoryInterface } from '@app/shared/interfaces/user.repository.interface';

@Injectable()
export class AuthService {
  constructor(
    @Inject('UsersRepositoryInterface')
    private readonly userRepository: UserRepositoryInterface,
  ) {}

  async getUsers() {
    return await this.userRepository.findAll();
  }

  async findByEmail(email: string) {
    return this.userRepository.findByCondition({
      where: {
        email: email,
      },
      select: ['id', 'firstName', 'email', 'lastName', 'password'],
    });
  }

  async hashPassword(password) {
    return bcrypt.hash(password, 12);
  }

  async register(newUser: NewUserDTO) {
    const { password, email, firstName, lastName } = newUser;

    const existingUser = await this.findByEmail(email);
    if (existingUser) {
      throw new ConflictException('An account with that email already exists!');
    }

    const hashedPassword = await this.hashPassword(password);

    const savedUser = await this.userRepository.save({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });

    delete savedUser.password;
    return savedUser;
  }
}
