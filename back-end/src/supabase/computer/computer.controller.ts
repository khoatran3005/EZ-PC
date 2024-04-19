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

    // Below copied from commit 3116f38 "Merge branch 'testbranch' of ..."
    // This method's removal in commit b090811 "fix" caused issues.

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
            // else if (hobby) {
            //     return this.computerService.getComputerWithHobby(min_price, max_price, hobby);
            // }
            // // If neither student_level nor hobby is provided
            // else {
            //     // Return all results without any filtering
            //     return this.computerService.getComputer(min_price, max_price);
            // }
        } catch (error) {
            console.error('An error occurred in the Computers() method:', error);
            throw error; // Optionally re-throw the error if necessary
        }
    }    // End of method copied from commit 3116f38
}