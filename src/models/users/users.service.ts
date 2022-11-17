/* eslint-disable prettier/prettier */
import { PrismaService } from './../../data-base/prisma.service';
import {  Injectable } from '@nestjs/common';
import { usersDTO } from './users.dto';

@Injectable()
export class UsersService {

  constructor(private prisma: PrismaService) {}

  async create(data: usersDTO) {

    const userExists = await this.prisma.user.findFirst({
      where: {
        password: data.password
      }
    })

    if(userExists){
      throw new Error("Password already exists");
    }
    const user = await this.prisma.user.create({
      data,
    });
    return user;
  }

  async findAll() {
    return this.prisma.user.findMany();
  }

  async update(id: string, data: usersDTO) {

    const userExists = await this.prisma.user.findUnique({
      where: {
        id,
      },
    });

    if(!userExists) {
      throw new Error("User does not exists");
    }

    return await this.prisma.user.update({
      data,
      where: {
        id,
      },
    });
  }

  async delete(id: string) {
    const userExists = await this.prisma.user.findUnique({
      where: {
        id,
      },
    });

    if(!userExists) {
      throw new Error("User does not exists");
    }

    return await this.prisma.user.delete({
      where: {
        id,
      },
    });
  }
}
