import { Controller, Post, Body, Get, Delete } from '@nestjs/common';
import { SavedComputerService } from './savedcomputer.service';

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
}