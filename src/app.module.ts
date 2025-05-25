import { Module } from '@nestjs/common';
import { CoreController } from './core/core.controller';
import { CoreService } from './core/core.service';
import { CompaniesModule } from './modules/company/companies.module';
import { MongoModule } from './modules/shared/database/mongo.module';

@Module({
  imports: [MongoModule, CompaniesModule],
  controllers: [CoreController],
  providers: [CoreService],
})
export class AppModule {}
