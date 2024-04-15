import { Controller, Post, Body } from '@nestjs/common';
import { SavedComputerService } from './savedcomputer.service';

@Controller('savedcomputer')
export class SavedComputerController {
    constructor(private readonly savedComputerService: SavedComputerService) { }

    // Implement controller endpoints here
    @Post()
    async saveComputer(
        @Body('user_id') user_id: string,
        @Body('computer_id') computer_id: string
    ): Promise<any> {
        return this.savedComputerService.savedComputer(user_id, computer_id);
    }
}