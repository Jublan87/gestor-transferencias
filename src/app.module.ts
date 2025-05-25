import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CoreController } from './core/core.controller';
import { CoreService } from './core/core.service';
import { envSchema } from './env.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
      validationSchema: envSchema,
    }),
  ],
  controllers: [CoreController],
  providers: [CoreService, ConfigService],
})
export class AppModule {}
