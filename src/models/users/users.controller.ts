/* eslint-disable prettier/prettier */
import { usersDTO } from './users.dto';
import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() data: usersDTO) {
    return this.usersService.create(data);
  }

  @Get()
  async findAll() {
    return this.usersService.findAll();
  }

  // http://localhost:3000/users/ id(...)
  @Put(":id")
  async update(@Param("id")id: string, @Body() data: usersDTO) {
    return this.usersService.update(id, data);
  }

  @Delete(":id")
  async delete(@Param('id') id: string) {
    return this.usersService.delete(id);
  }
}
