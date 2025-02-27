/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { Subject } from 'rxjs';

import { NotificationDto } from '../dtos/notification.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
//import { NotificationService } from '../notification/notification.service';

@Injectable()
export class AgendaService {
  private channels: Map<string, Subject<any>> = new Map();
  constructor(
    @InjectModel('Notification')
    private readonly notificationModel: Model<Notification>,
    //private readonly notificationService: NotificationService
  ) {}


  subscribe(id: string) {
    if (!this.channels.has(id)) {
      this.channels.set(id, new Subject());
    }
    return this.channels.get(id).asObservable();
  }

  emit(data: NotificationDto) {
    console.log('emitindo notificacao');
    const channel = this.channels.get(data.empresa_id.toString());
    console.log(">>>>", data);
    this.notificationModel.create(data);
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
