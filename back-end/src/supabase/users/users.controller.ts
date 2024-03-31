import { Controller, Post, Body, Get, Put, Delete, Param } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) { }

    @Post()
    async createUser(
        @Body('username') username: string,
        @Body('email') email: string,
        @Body('password') password: string
    ): Promise<any> {
        return this.usersService.createUser(username, email, password);
    }

    @Get()
    async getUsers(): Promise<any[]> {
        return this.usersService.getUsers();
    }

    @Get(':id')
    async getUserById(@Param('id') id: string): Promise<any> {
        return this.usersService.getUserById(parseInt(id, 10));
    }

    @Put(':id')
    async updateUser(@Param('id') id: string, @Body() userData: any): Promise<any> {
        return this.usersService.updateUser(parseInt(id, 10), userData);
    }

    @Delete(':id')
    async deleteUser(@Param('id') id: string): Promise<any> {
        return this.usersService.deleteUser(parseInt(id, 10));
    }
}