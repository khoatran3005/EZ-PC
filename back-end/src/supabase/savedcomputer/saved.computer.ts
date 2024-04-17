import { Controller, Post, Body, Get, Put, Delete, Param } from '@nestjs/common';
import { SavedComputerService } from './savedcomputer.service';
import { createSavedComputerDto } from './dto/create-savedcomputer.dto';

@Controller('savedcomputer')
export class SavedComputerController {
    constructor(private readonly savedComputerService: SavedComputerService) { }

    // Implement controller endpoints here

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
}