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
        console.log("check", hobbie)
        if (hobbie === '') {
            return this.computerService.getComputerSL(parseInt(min_price), parseInt(max_price), student_level)
        } else {
            return this.computerService.getComputer(parseInt(min_price), parseInt(max_price), student_level, hobbie);
        }
    }

    @Get('compare')
    async get(
        @Query('computer_id_1') computer_id_1: string,
        @Query('computer_id_2') computer_id_2: string): Promise<any[]> {
        console.log("testing: " + computer_id_1 + " " + computer_id_2);
        return this.computerService.compareComputer(computer_id_1, computer_id_2);
    }

    @Post('computer')
    async Computers(@Body() requestData: any): Promise<any> {
        try {
            const { min_price, max_price, student_level, hobby } = requestData;
            // Check if both student_level and hobby are provided
            if (student_level && hobby) {
                return this.computerService.getComputer(min_price, max_price, student_level, hobby);
            }
            // Check if only student_level is provided
            else if (student_level) {
                return this.computerService.getComputerSL(min_price, max_price, student_level);
            }
            // Check if only hobby is provided
            else if (hobby) {
                return this.computerService.getComputerWithHobby(min_price, max_price, hobby);
            }

        } catch (error) {
            console.error('An error occurred in the Computers() method:', error);
            throw error; // Optionally re-throw the error if necessary
        }
    }
}