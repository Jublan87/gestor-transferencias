import { Controller, Get } from '@nestjs/common';
import { CoreService } from './core.service';

@Controller()
export class CoreController {
  constructor(private readonly coreService: CoreService) {}

  @Get('health')
  healthCheck(): string {
    return this.coreService.healthCheck();
  }
}
