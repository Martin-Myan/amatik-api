import { Logger, ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { NestExpressApplication } from '@nestjs/platform-express';
import { setupAppConfig } from '@config/app/app.config';
import { setupSwagger } from '@config/api/swagger.config';
import { GlobalValidationPipeDataTransform } from '@exceptions/pipe.exception';

async function bootstrap() {
  const logger = new Logger('App');

  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    rawBody: true,
    cors: {
      origin: true,
      credentials: true,
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    },
    logger: ['error', 'warn', 'debug', 'log'],
  });

  setupAppConfig(app);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      exceptionFactory: (errors) =>
        new GlobalValidationPipeDataTransform(errors),
      skipMissingProperties: true,
    }),
  );
  setupSwagger(app);

  const configService = app.get(ConfigService);
  const APP_PORT = configService.get('app.port');

  await app.listen(APP_PORT, () => {
    logger.log(`App running in http://localhost:${APP_PORT}`);
  });
}

bootstrap();
