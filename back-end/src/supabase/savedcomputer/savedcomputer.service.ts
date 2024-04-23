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

    async getSavedComputers(user_id): Promise<any> {
        console.log(`getSavedComputers(user_id: ${user_id})`);

        // Get user's computer_ids from savedComputer
        const { data: savedData, error: savedError } = await this.supabase
            .from('savedcomputer')
            .select('computer_id')
            .eq('user_id', user_id);

        if (savedError) {
            console.error("Error getting saved computer_ids from user_id: ", savedError);
            throw savedError;
        }
        console.log("savedData: ", savedData);
        // Get Computer data from Computer using computer_ids
        const { data: computerData, error: computerError } = await this.supabase
            .from('computer')
            .select('*')
            .in('id',
                (savedData || [])
                    .map((saved) => saved.computer_id)
            );

        if (computerError) {
            console.error("Error getting computers from saved computer_ids: ", computerError);
            throw computerError;
        }

        console.log("computerData: ", computerData)
        return computerData;
    }

    async deleteSavedComputer(user_id, computer_id): Promise<void> {
        const { data, error } = await this.supabase
            .from('savedcomputer')
            .delete()
            .eq('user_id', user_id)
            .eq('computer_id', computer_id)
            .single();
        if (error) {
            throw error;
        }
    }
}