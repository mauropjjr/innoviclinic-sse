/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { Subject } from 'rxjs';

import { NotificationDto } from '../dtos/notification.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class AgendaService {
  private channels: Map<number, Subject<any>> = new Map();
  constructor(
    @InjectModel('Notification')
    private readonly notificationModel: Model<Notification>,
  ) {}


  subscribe(id: number) {
    if (!this.channels.has(id)) {
      this.channels.set(id, new Subject());
    }
    return this.channels.get(id).asObservable();
  }

  emit(data: NotificationDto) {
    const channel = this.channels.get(data.empresa_id);
    this.notificationModel.create(data);
    if (channel) {
      channel.next({ data });
    }
  }

  emitHeartbeat(id: number) {
    const channel = this.channels.get(id);
    if (channel) {
      channel.next({ data: { type: 'heartbeat', message: 'ping' } });
    }
  }
}
