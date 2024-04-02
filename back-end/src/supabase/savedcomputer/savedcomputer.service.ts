import { Injectable } from '@nestjs/common';
import { SupabaseService } from '../supabase.service';
import { SupabaseClient } from '@supabase/supabase-js';

@Injectable()
export class SavedComputerService {
    private supabase: SupabaseClient;

    constructor(private readonly supabaseService: SupabaseService) {
        this.supabase = supabaseService.getSupabaseClient();
    }

    // Implement methods for CRUD operations here
}