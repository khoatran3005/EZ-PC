import { Module } from '@nestjs/common';
import { SavedComputerService } from './savedcomputer.service';
import { SavedComputerController } from './saved.computer';
import { SupabaseService } from '../supabase.service';


@Module({
    providers: [SavedComputerService, SupabaseService],
    controllers: [SavedComputerController],
})
export class SavedComputersModule { }