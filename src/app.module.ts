import { Module } from '@nestjs/common';
import { CoreController } from './core/core.controller';
import { CoreService } from './core/core.service';

@Module({
  imports: [],
  controllers: [CoreController],
  providers: [CoreService],
})
export class AppModule {}
