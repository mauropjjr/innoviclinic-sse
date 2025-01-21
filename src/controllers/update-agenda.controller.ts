/* eslint-disable prettier/prettier */
import { Body, Controller, Param, Post, Res, Sse } from '@nestjs/common'
import { MessageDataDto } from '../dtos/MessageDataDto';
import { AgendaService } from '../services/agenda.service';



@Controller("update-agenda")
export class UpdateAgendaController {
  constructor(private readonly agendaService: AgendaService) {}

  @Post()
  sendMessage(
    @Body() c: MessageDataDto,
    @Res() res,
  ) {
    c.emitting=  new Date().toISOString(); 
    console.log( c );
    this.agendaService.emit( c );
    res.status(200).send({ status: 'Message sent' });
  }


  @Sse('stream/:id')
  events(@Param('id') id: string) {
    console.log(`This action returns udpadate-agenda a #${id} events fila`);
    return this.agendaService.subscribe(id);
  }

}
