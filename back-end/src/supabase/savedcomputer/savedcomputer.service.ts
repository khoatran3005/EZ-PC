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
    async savedComputer(user_id: string, computer_id: string): Promise<any[]> {
        const { data, error } = await this.supabase
            .from('savedcomputer')
            .insert([{ user_id, computer_id }]);
        if (error) {
            throw error;
        }
        console.log(data)
        return data;
    }
}