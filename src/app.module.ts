import { Module } from '@nestjs/common';
import { CoreController } from './core/core.controller';
import { CoreService } from './core/core.service';
import { CompanyModule } from './modules/company/company.module';
import { MongoModule } from './modules/shared/database/mongo.module';

@Module({
  imports: [MongoModule, CompanyModule],
  controllers: [CoreController],
  providers: [CoreService],
})
export class AppModule {}
