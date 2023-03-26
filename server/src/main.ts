import { NestFactory } from '@nestjs/core';
import { SwaggerModule } from '@nestjs/swagger/dist';
import { AppModule } from './app.module';
import { swaggerConfig } from './configs/swagger.config';
import * as express from 'express';
import * as path from 'path';
import * as fs from 'fs';
import { NestExpressApplication } from '@nestjs/platform-express';

async function start() {
  const PORT = process.env.PORT || 3000;
  const HOST = process.env.URL_HOST || 'http://localhost';

  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('/api/docs', app, document);

  app.enableCors();
  app.useStaticAssets(path.join(__dirname, '..', 'src', 'static', 'types'), {prefix: '/types'});
  app.useStaticAssets(path.join(__dirname, '..', 'src', 'static', 'brands'), {prefix: '/brands'});
  app.useStaticAssets(path.join(__dirname, '..', 'src', 'static', 'slides'), {prefix: '/slides'});
  app.useStaticAssets(path.join(__dirname,'..',  'src', 'static', 'product'), {prefix: '/products'});
  app.useStaticAssets(path.join(__dirname, '..', 'src', 'static', 'reviews'), {prefix: '/reviews'});
  app.useStaticAssets(path.join(__dirname, '..', 'src', 'static', 'avatars'), {prefix: '/avatars'});

  await app.listen(PORT, () => {
    console.log(`Server started... Go to the ${HOST}:${PORT}`);
  });
}
start();
