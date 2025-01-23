/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AgendaService } from './services/agenda.service';
import { UpdateAgendaController } from './controllers/update-agenda.controller';
import { NotificationModule } from './notification/notification.module';
import { MongooseModule } from '@nestjs/mongoose';
import { NotificationSchema } from './schemas/notification.schema';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ 
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGO_URI), 
    NotificationModule,  
    MongooseModule.forFeature([
        { name: 'Notification', schema: NotificationSchema }, // Registra o modelo
      ]),],
  controllers: [AppController, UpdateAgendaController],
  providers: [AppService, AgendaService],
})
export class AppModule {}
