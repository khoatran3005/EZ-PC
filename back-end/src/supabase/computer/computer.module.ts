import { Module } from '@nestjs/common';
import { ComputerService } from './computer.service';
import { ComputerController } from './computer.controller';
import { SupabaseService } from '../supabase.service';


@Module({
    providers: [ComputerService, SupabaseService],
    controllers: [ComputerController],
})
export class ComputersModule { }