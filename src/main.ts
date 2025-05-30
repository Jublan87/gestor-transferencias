import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import { name, version } from '@root/package.json';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const logger = new Logger('Bootstrap');

  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);

  const config = new DocumentBuilder()
    .setTitle(String(name))
    .setDescription('API description & documentation')
    .setVersion(String(version))
    .build();

  const document = SwaggerModule.createDocument(app, config);

  const swaggerPath = 'api';
  SwaggerModule.setup(swaggerPath, app, document);

  app.useGlobalPipes(
    new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }),
  );

  const configService = app.get(ConfigService);
  const port = configService.get<number>('PORT', 3000);
  await app.listen(port);
  logger.log(`Server is running on PORT: ${port}`);
  logger.log(`Swagger UI available at: /${swaggerPath}`);
}

void bootstrap();
