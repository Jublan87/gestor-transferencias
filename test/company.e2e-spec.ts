import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { MongoCompanyRepository } from '@root/src/modules/company/infrastructure/repositories/company.repository';

describe('Company Endpoints (e2e)', () => {
  let app: INestApplication;
  let moduleFixture: TestingModule;

  beforeAll(async () => {
    moduleFixture = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }),
    );
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('/companies/with-transfers-last-month (GET)', async () => {
    const res = await request(app.getHttpServer())
      .get('/companies/with-transfers-last-month')
      .expect(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('/companies/new-last-month (GET)', async () => {
    const res = await request(app.getHttpServer())
      .get('/companies/new-last-month')
      .expect(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('/companies/adhere (POST)', async () => {
    const dto = {
      cuit: 'mock-cuit',
      businessName: 'mock company',
      adhesionDate: '2023-10-01',
    };
    const res = await request(app.getHttpServer())
      .post('/companies/adhere')
      .send(dto)
      .expect(201);
    expect(res.body).toHaveProperty('cuit', dto.cuit);
    expect(res.body).toHaveProperty('businessName', dto.businessName);
    expect(res.body).toHaveProperty('adhesionDate');

    const repo = moduleFixture.get<MongoCompanyRepository>(
      'CompanyRepositoryPort',
    );
    await repo.deleteByCuit(dto.cuit);
  });
});
