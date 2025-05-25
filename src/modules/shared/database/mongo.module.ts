import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { envConfig } from '@root/src/env.config';

@Module({
  imports: [MongooseModule.forRoot(envConfig.URL_MONGO)],
  exports: [MongooseModule],
})
export class MongoModule {}
