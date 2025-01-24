/* eslint-disable prettier/prettier */
import { Body, Controller, Param, Post, Res, Sse } from '@nestjs/common';
//import { MessageDataDto } from '../dtos/MessageDataDto';
import { AgendaService } from '../services/agenda.service';
import { Observable } from 'rxjs';
import { NotificationDto } from 'src/dtos/notification.dto';
//import { NotificationService } from 'src/notification/notification.service';

@Controller('update-agenda')
export class UpdateAgendaController {
  constructor(
    private readonly agendaService: AgendaService,
  //  private readonly notificationService: NotificationService,
  ) {}

  @Post()
  sendMessage(@Body() c: NotificationDto, @Res() res) {
    c.emitting=  new Date().toISOString();
    //console.log(c);
    this.agendaService.emit(c);
    res.status(200).send({ status: 'Message sent' });
  }

  // @Sse('stream/:id')
  // events(@Param('id') id: string) {
  //   console.log(`This action returns udpadate-agenda a #${id} events fila`);
  //   return this.agendaService.subscribe(id);
  // }
  @Sse('stream/:id')
  events(@Param('id') id: string) {
    console.log(`Iniciando conexão SSE para o ID: ${id}`);
    return new Observable((observer) => {
      const subscription = this.agendaService.subscribe(id).subscribe({
        next: (data) => observer.next(data),
        error: (err) => {
          console.error('Erro na conexão SSE:', err);
          observer.error(err);
        },
        complete: () => {
          console.log('Conexão SSE fechada para o ID:', id);
          observer.complete();
        },
      });

      return () => {
        subscription.unsubscribe();
      };
    });
  }
}
