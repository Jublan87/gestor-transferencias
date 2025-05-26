import { CoreService } from './core.service';

jest.mock('@root/package.json', () => ({
  name: 'test-app',
  version: '1.0.0',
}));

describe('CoreService', () => {
  let service: CoreService;

  beforeEach(() => {
    service = new CoreService();
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.resetModules();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return correct health check message', () => {
    const result = service.healthCheck();
    expect(result).toBe('test-app in running. Version 1.0.0');
  });

  it('should call healthCheck and return a string', () => {
    const spy = jest.spyOn(service, 'healthCheck');
    const result = service.healthCheck();
    expect(spy).toHaveBeenCalled();
    expect(typeof result).toBe('string');
    spy.mockRestore();
  });
});
