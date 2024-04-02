// supabase/users/users.module.ts
import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { SupabaseService } from '../supabase.service';

@Module({
  controllers: [UsersController],
  providers: [UsersService, SupabaseService], // Include SupabaseService in providers
})
export class UsersModule { }