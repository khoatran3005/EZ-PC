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

<<<<<<< HEAD
    async savedComputer(user_id: number, computer_id: string): Promise<void> {
        const { data, error } = await this.supabase
            .from('savedcomputer')
            .select('*')
            .eq('user_id', user_id)
            .eq('computer_id', computer_id)
            .single();
        if (data) {
            // Relationship already exists, handle accordingly (throw an error, return, etc.)
            throw new Error('User already saved this computer');
        }

        const { error: saveError } = await this.supabase
            .from('savedcomputer')
            .insert([{ user_id, computer_id }]);

        if (saveError) {
            throw saveError;
        }
    }

    async getSavedComputer(saved_id): Promise<any> {
        const { data, error } = await this.supabase
            .from('savedcomputer')
            .select('*')
            .eq('saved_id', saved_id)
            .single();
        if (error) {
            throw error;
        }
        return data;
    }

    async deleteSavedComputer(saved_id): Promise<void> {
        const { data, error } = await this.supabase
            .from('savedcomputer')
            .delete()
            .eq('saved_id', saved_id)
        if (error) {
            throw error;
        }
    }
=======
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
>>>>>>> testbranch
}