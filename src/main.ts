/* eslint-disable prettier/prettier */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors(); // Enable CORS
  app.use((req, res, next) => {
    res.setTimeout(300000, () => { 
      console.log('Request timed out');
      res.status(504).send('Timeout');
    });
    next();
  });
  await app.listen(3000);
}
bootstrap();
