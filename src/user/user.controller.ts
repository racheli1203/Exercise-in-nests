// src/vehicle/vehicle.controller.ts

import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from '../data-base/user.schema';

@Controller('users')
export class UserController {
    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) { }

    @Get()
    async getAll(): Promise<User[]> {
        return this.userModel.find().exec();
    }

    @Get(':id')
    async getById(@Param('id') id: string): Promise<User> {
        return this.userModel.findById(id).exec();
    }

    @Post()
    async post(@Body() user: User): Promise<User> {
        try {
            const createdCar = await this.userModel.create(user);
            return createdCar.save();


        }
        catch (error) {
            throw new Error(`Failed to create user: ${error.message}`);

        }
    }
  
    @Put(':id')
    async put(@Param('id') id: string, @Body() updatedCar: User): Promise<User> {
        return this.userModel.findOneAndUpdate({ _id: id }, updatedCar, { new: true }).exec();
    }

    @Delete(':id')
    async delete(@Param('id') id: string): Promise<User> {
        return this.userModel.findOneAndDelete({ _id: id }).exec();
    }

}
