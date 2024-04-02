import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { SavedComputersModule } from './savedcomputer/savedcomputer.module';
import { ComputersModule } from './computer/computer.module';
import { SupabaseService } from './supabase.service';


@Module({
  imports: [UsersModule, ComputersModule, SavedComputersModule],
  providers: [SupabaseService]
})
export class SupabaseModule { }