/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { fromEvent } from 'rxjs';
import { EventEmitter } from 'stream';
import { MessageDataDto } from '../dtos/MessageDataDto';

@Injectable()
export class AgendaService {
  private readonly emitter: EventEmitter;
  private channel: string;

  constructor() {
    this.emitter = new EventEmitter();
  }
  subscribe(id: string) {
    this.channel = id;
    return fromEvent(this.emitter, this.channel);
  }

  emit(data: MessageDataDto) {
    this.channel = data.empresa_id;
    this.emitter.emit(this.channel, { data });
  }

}
