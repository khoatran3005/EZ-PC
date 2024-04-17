import { Injectable } from '@nestjs/common';
import { SupabaseService } from '../supabase.service';
import { SupabaseClient } from '@supabase/supabase-js';
import { createSavedComputerDto } from './dto/create-savedcomputer.dto';

@Injectable()
export class SavedComputerService {
    private supabase: SupabaseClient;

    constructor(private readonly supabaseService: SupabaseService) {
        this.supabase = supabaseService.getSupabaseClient();
    }

    // Implement methods for CRUD operations here
    
    async createSavedComputer(createSavedDto: createSavedComputerDto): Promise<any> {
        let { user_id, computer_id: computer_id } = createSavedDto;
        const { data, error } = await this.supabase
          .from('savedcomputer')
          .insert([{ user_id, computer_id }]);
        if (error) {
          throw error;
        }
        return data;
      }
}