import { Controller } from '@nestjs/common';
import { Ctx, MessagePattern, RmqContext } from "@nestjs/microservices";
import { PresenceService } from './presence.service';

@Controller()
export class PresenceController {
  constructor(private readonly presenceService: PresenceService) {}

  @MessagePattern({ cmd: 'get-pres' })
  async getUser(@Ctx() context: RmqContext) {
    const channel = context.getChannelRef();
    const message = context.getMessage();
    // console.log(channel);
    // channel.asc(message);
    return this.presenceService.getHello();
  }
}
