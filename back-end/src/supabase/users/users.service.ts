import { Injectable, UnauthorizedException } from '@nestjs/common';
import { SupabaseService } from '../supabase.service';
import { SupabaseClient } from '@supabase/supabase-js';
import * as bcrypt from 'bcryptjs';
import { CreateUserDto } from './dto/create-user.dto';
import { compare } from 'bcryptjs';
import { LoginUserDto } from './dto/login-user.dto';

@Injectable()
export class UsersService {
  private supabase: SupabaseClient;

  constructor(private readonly supabaseService: SupabaseService) {
    this.supabase = supabaseService.getSupabaseClient();
  }

  getHashPassword = (password: string) => {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync("password", salt);
    return hash;
  }

  async comparePassword(enteredPassword: string, hashedPassword: string): Promise<boolean> {
    return await bcrypt.compare(enteredPassword, hashedPassword);
  }

  async createUser(createUserDto: CreateUserDto): Promise<any> {
    let { name, email, password } = createUserDto;
    password = this.getHashPassword(password);
    const { data, error } = await this.supabase
      .from('users')
      .insert([{ name, email, password }]);
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

  async login(loginUserDto: LoginUserDto): Promise<any> {
    const { data, error } = await this.supabase
      .from('users')
      .select('*')
      .eq('email', loginUserDto.email)
      .single();
    if (error) {
      throw error;
    }
    if (!data) {
      throw new UnauthorizedException('Invalid credentials');
    }
    console.log(loginUserDto.password)
    console.log(data.password)
    const isValidPassword = this.comparePassword(loginUserDto.password, data.password);
    if (!isValidPassword) {
      throw new UnauthorizedException('Invalid credentials');
    }
    // Password is correct, return user data excluding password
    const { password: _, ...userData } = data;
    return userData;
  }
}