<<<<<<< HEAD
import { Controller, Post, Body, Get, Delete } from '@nestjs/common';
=======
import { Controller, Post, Body, Get, Put, Delete, Param } from '@nestjs/common';
>>>>>>> testbranch
import { SavedComputerService } from './savedcomputer.service';
import { createSavedComputerDto } from './dto/create-savedcomputer.dto';

@Controller('savedcomputer')
export class SavedComputerController {
    constructor(private readonly savedComputerService: SavedComputerService) { }

    // Implement controller endpoints here
<<<<<<< HEAD
    @Post()
    async saveComputer(
        @Body('user_id') user_id: number,
        @Body('computer_id') computer_id: string
    ): Promise<any> {
        return this.savedComputerService.savedComputer(user_id, computer_id);
    }

    @Get()
    async getSavedComputer(
        @Body('saved_id') saved_id: string
    ): Promise<any> {
        return this.savedComputerService.getSavedComputer(saved_id);
    }

    @Delete()
    async deleteComputer(
        @Body('saved_id') saved_id: string
    ): Promise<any> {
        return this.savedComputerService.deleteSavedComputer(saved_id);
    }
=======

    @Post()
    async createSavedComputer(
        @Body() createSavedDto: createSavedComputerDto
    ): Promise<any> {
        return this.savedComputerService.createSavedComputer(createSavedDto);
    }

    // @Get()
    // async getSavedComputers(): Promise<any[]> {
    //     return this.savedComputerService.getSavedComputers();
    // }

    // @Delete(':id')
    // async deleteSavedComputer(@Param('id') id: string): Promise<any> {
    //     return this.savedComputerService.deleteSavedComputer();
    // }
>>>>>>> testbranch
}