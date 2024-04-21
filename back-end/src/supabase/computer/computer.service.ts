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

    async fetchDatatoDatabase(): Promise<any> {
        const options = {
            method: 'GET',
            url: 'https://laptopdb1.p.rapidapi.com/laptop/search',
            params: { company: 'Apple' },
            headers: {
                'X-RapidAPI-Key': '2478155a8cmshcaf03d1de7a38f0p128265jsnfe5212b1355c',
                'X-RapidAPI-Host': 'laptopdb1.p.rapidapi.com'
            }
        };

        try {
            const response = await axios.request(options);
            for (const key in response.data.result.laptops) {
                //get data from API
                const result = response.data.result.laptops[key];
                const id: string = result._id.$oid;
                const name: string = result.name;
                const company: string = result.company;
                const os: string = result.os;
                const processor = {
                    company: result.cpu.company,
                    type: result.cpu.type,
                    model: result.cpu.model
                };

                const display: number = result.screen.inches;

                const graphics_card = {
                    company: result.graphics_card.company,
                    type: result.graphics_card.type,
                    model: result.graphics_card.model
                };

                const ram: number = result.ram.amount;

                const dimensions = {
                    dimensions: result.dimensions.dimensions,
                    weight: result.dimensions.weight
                };

                const storage = {
                    space: parseInt(result.drives[0].space),
                    type: result.drives[0].type
                };

                let image = result.images;
                const price: number = result.price;
                const tag: string[] = await this.classifyComputer(processor, ram, storage, display);

                // //change image from URL to store in database
                // const data1 = await axios.get(image, { responseType: 'arraybuffer' });
                // image = Buffer.from(data1.data);

                this.createComputer({
                    id, name, company, os, processor, display, graphics_card, ram, dimensions, storage, image, price, tag
                })
            }
            return response.data;
        } catch (error) {
            throw new Error(`Error searching laptops: ${error.message}`);
        }
    }

    createComputer = async (createComputerDto: CreateComputerDto): Promise<any> => {
        const { id, name, company, os, processor, display, graphics_card, ram, dimensions, storage, image, price, tag } = createComputerDto;
        const { data, error } = await this.supabase
            .from('computer')
            .insert([{ id, name, company, os, processor, display, graphics_card, ram, dimensions, storage, image, price, tag }]);
        if (error) {
            throw error;
        }
        return data;
    }

    classifyComputer = async (processor: { company: string, type: string, model: string },
        ram: number,
        storage: { space: number, type: string },
        display: number
    ): Promise<any> => {
        let tag: string[] = [];
        if (ram === 8 && storage.space === 512 && display === 14) {
            tag.push("elementary")
        }
        if ((processor.type === 'ryzen' || processor.model.startsWith('Core i3') &&
            (ram >= 8 && ram <= 16) &&
            (storage.space >= 512 && storage.space <= 1024) &&
            (display >= 14 && display <= 15)
        )) {
            tag.push("middle_school")
        }
        if ((processor.type === 'ryzen' || processor.model.startsWith('Core i5') &&
            (ram === 16) &&
            (storage.space >= 512 && storage.space <= 1024) &&
            (display >= 15 && display <= 16)
        )) {
            tag.push("high_school")
        }
        if ((processor.type === 'ryzen' || processor.model.startsWith('Core i7') || processor.model.startsWith('Core i9') &&
            (ram >= 16) &&
            (storage.space >= 512) &&
            (display >= 15 && display <= 16)
        )) {
            tag.push("college")
        }
        if ((processor.type === 'ryzen' || processor.model.startsWith('Core i7') || processor.model.startsWith('Core i9') &&
            (ram >= 16) &&
            (storage.space >= 512) &&
            (display >= 15 && display <= 17)
        )) {
            tag.push("gaming")
        }
        if ((processor.type === 'ryzen' || processor.model.startsWith('Core i7') || processor.model.startsWith('Core i9') &&
            (ram >= 16) &&
            (storage.space >= 512) &&
            (display >= 15 && display <= 17)
        )) {
            tag.push("video_editing")
        }
        return tag;
    }

    async getComputer(min_price: number, max_price: number, student_level: string, hobbie: string): Promise<any[]> {


        const { data, error } = await this.supabase
            .from('computer')
            .select('*')
            .gte('price', min_price) // Filter by minimum price
            .lte('price', max_price) // Filter by maximum price
            .contains('tag', [student_level, hobbie])
            .limit(10);
        if (error) {
            throw error;
        }
        console.log(data)
        return data;
    }
    //get computer with only student level provided
    async getComputerSL(min_price: number, max_price: number, student_level: string): Promise<any[]> {


        const { data, error } = await this.supabase
            .from('computer')
            .select('*')
            .gte('price', min_price) // Filter by minimum price
            .lte('price', max_price) // Filter by maximum price
            .contains('tag', [student_level])
            .limit(10);
        if (error) {
            throw error;
        }
        console.log(data)
        return data;
    }

    async getComputerWithHobby(min_price: number, max_price: number, hobbie: string): Promise<any[]> {


        const { data, error } = await this.supabase
            .from('computer')
            .select('*')
            .gte('price', min_price) // Filter by minimum price
            .lte('price', max_price) // Filter by maximum price
            .contains('tag', [hobbie])
            .limit(10);
        if (error) {
            throw error;
        }
        console.log(data)
        return data;
    }

    async compareComputer(computer_id_1: string, computer_id_2: string): Promise<any[]> {
        const { data: data1, error: error1 } = await this.supabase // get first computer information
            .from('computer')
            .select('*')
            .eq('id', computer_id_1)
            .single();
        const { data: data2, error: error2 } = await this.supabase // get second computer information
            .from('computer')
            .select('*')
            .eq('id', computer_id_2)
            .single();

        if (error1 || error2) {
            throw error1 || error2;
        }
        return [data1, data2];
    }
    // Below copied from commit 3116f38 "Merge branch 'testbranch' of ..."
    // This method's removal in commit b090811 "fix" caused issues.

     // End of method copied from commit 3116f38
}