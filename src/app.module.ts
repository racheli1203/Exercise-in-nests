import { UserController } from './user/user.controller';


import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DatabaseModule } from './data-base/database.module';
import {User, UserSchema } from './data-base/user.schema'

@Module({
  imports: [
    DatabaseModule,
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])
  ],
  controllers: [UserController],
})
export class AppModule {}
