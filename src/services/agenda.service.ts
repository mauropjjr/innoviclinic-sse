/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import {  Subject } from 'rxjs';
import { MessageDataDto } from '../dtos/MessageDataDto';

@Injectable()
export class AgendaService {
  // private readonly emitter: EventEmitter;
  // private channel: string;

  // constructor() {
  //   this.emitter = new EventEmitter();
  // }
  // subscribe(id: string) {
  //   this.channel = id;
  //   return fromEvent(this.emitter, this.channel);
  // }

  // emit(data: MessageDataDto) {
  //   this.channel = data.empresa_id;
  //   this.emitter.emit(this.channel, { data });
  // }
  private channels: Map<string, Subject<any>> = new Map();

  subscribe(id: string) {
    if (!this.channels.has(id)) {
      this.channels.set(id, new Subject());
    }
    return this.channels.get(id).asObservable();
  }

  emit(data: MessageDataDto) {
    const channel = this.channels.get(data.empresa_id);
    if (channel) {
      channel.next({ data });
    }
  }

  emitHeartbeat(id: string) {
    const channel = this.channels.get(id);
    if (channel) {
      channel.next({ data: { type: 'heartbeat', message: 'ping' } });
    }
  }

}
