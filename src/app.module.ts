/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AgendaService } from './services/agenda.service';
import { UpdateAgendaController } from './controllers/update-agenda.controller';

@Module({
  imports: [],
  controllers: [AppController, UpdateAgendaController],
  providers: [AppService, AgendaService],
})
export class AppModule {}
