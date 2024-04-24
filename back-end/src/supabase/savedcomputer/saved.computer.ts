import { Controller, Post, Body, Get, Delete, Query } from '@nestjs/common';
import { SavedComputerService } from './savedcomputer.service';
import { createSavedComputerDto } from './dto/create-savedcomputer.dto';

@Controller('savedcomputer')
export class SavedComputerController {
    constructor(private readonly savedComputerService: SavedComputerService) { }

    // Implement controller endpoints here
    @Post()
    async saveComputer(
        @Body('user_id') user_id: number,
        @Body('computer_id') computer_id: string
    ): Promise<any> {
        return this.savedComputerService.savedComputer(user_id, computer_id);
    }

    @Get()
    async getSavedComputers(
        @Query('user_id') user_id: string,
    ): Promise<any> {
        console.log(`controller, user_id: ${user_id}`);
        return this.savedComputerService.getSavedComputers(parseInt(user_id));
    }

    @Delete()
    async deleteComputer(
        @Query('user_id') user_id: string,
        @Query('computer_id') computer_id: string
    ): Promise<any> {
        console.log(`controller, user_id: ${user_id}, computer_id: ${computer_id}`);
        return this.savedComputerService.deleteSavedComputer(parseInt(user_id), computer_id);
    }
}