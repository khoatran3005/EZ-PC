import { Controller, Get, Param, Post, Body, Put, Delete } from '@nestjs/common';
import { ComputerService } from './computer.service';
import { CreateComputerDto } from './dto/create-computer.dto';


@Controller('computer')
export class ComputerController {
    constructor(private readonly computerService: ComputerService) { }

    // Implement controller endpoints here
    @Get()
    async getComputers(): Promise<any> {
        return this.computerService.fetchDataFromNoteb();
    }

    @Post()
    async createUser(
        @Body() createComputerDto: CreateComputerDto
    ): Promise<any> {
        return this.computerService.createComputer(createComputerDto);
    }

    @Get()
    async getUsers(): Promise<any[]> {
        return this.computerService.getComputer();
    }

    @Get(':id')
    async getUserById(@Param('id') id: string): Promise<any> {
        return this.computerService.getComputerById(parseInt(id, 10));
    }

    @Put(':id')
    async updateUser(@Param('id') id: string, @Body() computerData: any): Promise<any> {
        return this.computerService.updateComputer(parseInt(id, 10), computerData);
    }

    @Delete(':id')
    async deleteUser(@Param('id') id: string): Promise<any> {
        return this.computerService.deleteComputer(parseInt(id, 10));
    }
}