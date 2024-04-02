import { Controller } from '@nestjs/common';
import { SavedComputerService } from './savedcomputer.service';

@Controller('savedcomputer')
export class SavedComputerController {
    constructor(private readonly savedComputerService: SavedComputerService) { }

    // Implement controller endpoints here
}