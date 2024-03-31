import { Injectable } from '@nestjs/common';
import { SupabaseService } from '../supabase.service';
import { SupabaseClient } from '@supabase/supabase-js';
import { genSaltSync, hashSync } from 'bcryptjs';

@Injectable()
export class UsersService {
  private supabase: SupabaseClient;

  constructor(private readonly supabaseService: SupabaseService) {
    this.supabase = supabaseService.getSupabaseClient();
  }

  getHashPassword = (password: string) => {
    const salt = genSaltSync(10);
    const hash = hashSync("password", salt);
    return hash;
  }

  async createUser(username: string, email: string, password: string): Promise<any> {
    const hashPassword = this.getHashPassword(password);
    password = hashPassword;
    console.log(password);
    const { data, error } = await this.supabase
      .from('users')
      .insert([{ username, email, password }]);
    if (error) {
      throw error;
    }
    return data;
  }

  async getUsers(): Promise<any[]> {
    const { data, error } = await this.supabase
      .from('users')
      .select('*');
    if (error) {
      throw error;
    }
    return data;
  }

  async getUserById(userId: number): Promise<any> {
    const { data, error } = await this.supabase
      .from('users')
      .select('*')
      .eq('userid', userId)
      .single();
    if (error) {
      throw error;
    }
    return data;
  }

  async updateUser(userId: number, userData: any): Promise<any> {
    const { data, error } = await this.supabase
      .from('users')
      .update(userData)
      .eq('userid', userId);
    if (error) {
      throw error;
    }
    return data;
  }

  async deleteUser(userId: number): Promise<any> {
    const { data, error } = await this.supabase
      .from('users')
      .delete()
      .eq('userid', userId);
    if (error) {
      throw error;
    }
    return data;
  }
}