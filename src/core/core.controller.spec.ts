jest.mock(
  '@root/package.json',
  () => ({ name: 'test-app', version: '0.0.1' }),
  { virtual: true },
);

import { Test, TestingModule } from '@nestjs/testing';
import { CoreController } from './core.controller';
import { CoreService } from './core.service';

describe('CoreController', () => {
  let coreController: CoreController;
  let coreService: Partial<CoreService>;

  beforeEach(async () => {
    coreService = {
      healthCheck: jest.fn().mockReturnValue('OK'),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [CoreController],
      providers: [
        {
          provide: CoreService,
          useValue: coreService,
        },
      ],
    }).compile();

    coreController = module.get<CoreController>(CoreController);
  });

  describe('healthCheck', () => {
    it('debería retornar el valor de healthCheck desde el servicio', () => {
      const result = coreController.healthCheck();
      expect(coreService.healthCheck).toHaveBeenCalledTimes(1);
      expect(result).toBe('OK');
    });
  });
});
