import { Controller, Get, Param, Post, Body, Put, Delete, Query } from '@nestjs/common';
import { ComputerService } from './computer.service';
import { CreateComputerDto } from './dto/create-computer.dto';


@Controller('computer')
export class ComputerController {
    constructor(private readonly computerService: ComputerService) { }

    // Implement controller endpoints here
    @Get('api')
    async getComputers(): Promise<any> {
        return this.computerService.fetchDatatoDatabase();
    }

    @Get()
    async getUsers(@Body('min_price') min_price: string,
        @Body('max_price') max_price: string,
        @Body('student_level') student_level: string,
        @Body('hobbie') hobbie: string): Promise<any[]> {
        return this.computerService.getComputer(parseInt(min_price), parseInt(max_price), student_level, hobbie);
    }
}