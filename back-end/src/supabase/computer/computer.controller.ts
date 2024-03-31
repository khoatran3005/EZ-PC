import { Controller } from '@nestjs/common';
import { ComputerService } from './computer.service';

@Controller('savedcomputer')
export class ComputerController {
    constructor(private readonly ComputerService: ComputerService) { }

    // Implement controller endpoints here
}