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
    async getComputer(@Body('min_price') min_price: string,
        @Body('max_price') max_price: string,
        @Body('student_level') student_level: string,
        @Body('hobbie') hobbie: string): Promise<any[]> {
        return this.computerService.getComputer(parseInt(min_price), parseInt(max_price), student_level, hobbie);
    }

    @Get('compare')
    async get(@Body('computer_id_1') computer_id_1: string,
        @Body('computer_id_2') computer_id_2: string): Promise<any[]> {
        return this.computerService.compareComputer(computer_id_1, computer_id_2);
    }
}