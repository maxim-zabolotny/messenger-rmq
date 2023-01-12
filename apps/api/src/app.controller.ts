import { Controller, Get, Inject, Post } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor(
    @Inject('AUTH_SERVICE') private authService: ClientProxy,
    @Inject('PRESENCE_SERVICE') private presenceService: ClientProxy,
  ) {}

  @Get()
  async getUser() {
    return this.authService.send(
      {
        cmd: 'get-users',
      },
      {},
    );
  }

  @Post()
  async postUser() {
    return this.authService.send(
      {
        cmd: 'post-user',
      },
      {},
    );
  }

  @Get('pres')
  async getPres() {
    return this.presenceService.send(
      {
        cmd: 'get-pres',
      },
      {},
    );
  }
}
