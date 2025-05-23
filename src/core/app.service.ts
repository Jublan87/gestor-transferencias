import { Injectable } from '@nestjs/common';
import { name, version } from '@root/package.json';

@Injectable()
export class AppService {
  healthCheck(): string {
    return `${name} corriendo. Version ${version}`;
  }
}
