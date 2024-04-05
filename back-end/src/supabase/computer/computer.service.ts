import { Injectable } from '@nestjs/common';
import { SupabaseService } from '../supabase.service';
import { SupabaseClient } from '@supabase/supabase-js';
import axios from 'axios';
import { CreateComputerDto } from './dto/create-computer.dto';

@Injectable()
export class ComputerService {
    private supabase: SupabaseClient;

    constructor(private readonly supabaseService: SupabaseService) {
        this.supabase = supabaseService.getSupabaseClient();
    }

    // Implement methods for CRUD operations here

    async fetchDataFromNoteb(): Promise<any> {
        try {
            const apiKey = 'FtS0MNE1dt8pvBTbac'; // Public API key provided for testing
            const requestData = {
                apikey: apiKey,
                method: 'get_model_info',
                param: {
                    model_id: 1175,
                }
            };
            const formData = new FormData();
            for (const key in requestData) {
                formData.append(key, requestData[key]);
            }
            console.log(formData)
            const response = await axios.post('https://noteb.com/api/webservice.php', formData);
            console.log(response.data);
            return response.data; // or do something with the data
        } catch (error) {
            throw new Error(`Error fetching data from noteb.com: ${error.message}`);
        }
    }

    async createComputer(createComputerDto: CreateComputerDto): Promise<any> {
        const { name, type, processor, memorysize, storagesize, displaysize, price } = createComputerDto;
        const { data, error } = await this.supabase
            .from('computer')
            .insert([{ name, type, processor, memorysize, storagesize, displaysize, price }]);
        if (error) {
            throw error;
        }
        return data;
    }

    async getComputer(): Promise<any[]> {
        const { data, error } = await this.supabase
            .from('computer')
            .select('*');
        if (error) {
            throw error;
        }
        return data;
    }

    async getComputerById(computerId: number): Promise<any> {
        const { data, error } = await this.supabase
            .from('computer')
            .select('*')
            .eq('computerId', computerId)
            .single();
        if (error) {
            throw error;
        }
        return data;
    }

    async updateComputer(computerId: number, computerData: any): Promise<any> {
        const { data, error } = await this.supabase
            .from('computer')
            .update(computerData)
            .eq('computerId', computerId);
        if (error) {
            throw error;
        }
        return data;
    }

    async deleteComputer(computerId: number): Promise<any> {
        const { data, error } = await this.supabase
            .from('computer')
            .delete()
            .eq('computerId', computerId);
        if (error) {
            throw error;
        }
        return data;
    }
}