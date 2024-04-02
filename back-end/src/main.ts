import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  app.enableCors({
    origin: 'http://localhost:3001', // or true to allow all origins
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // specify the allowed HTTP methods
    allowedHeaders: ['Content-Type', 'Authorization'], // specify the allowed headers
    credentials: true, // allow sending credentials like cookies or authorization headers
  });

  await app.listen(configService.get<string>('PORT'));


}
bootstrap();
