import { Injectable } from '@nestjs/common';
import { name, version } from '@root/package.json';

@Injectable()
export class CoreService {
  healthCheck(): string {
    return `${name} in running. Version ${version}`;
  }
}
