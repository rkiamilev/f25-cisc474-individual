import { Controller, Get, Query } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async findAll(
    @Query('name') name?: string,
    @Query('email') email?: string
  ) {
    return this.userService.findAll({ name, email });
  }
}