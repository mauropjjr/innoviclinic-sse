import { Injectable, NotFoundException } from '@nestjs/common';

import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { NotificationDto } from 'src/dtos/notification.dto';
import { Notification } from 'src/schemas/notification.schema';

@Injectable()
export class NotificationService {
  notification: any;
  constructor(
    @InjectModel('Notification')
    private readonly notificationModel: Model<Notification>,
  ) {}

  async create(notification: NotificationDto): Promise<Notification> {
    const createdAgenda = new this.notificationModel(notification);
    return createdAgenda.save();
  }

  // Atualiza uma notificação existente
  async update(
    id: string,
    updateNotificationDto: NotificationDto,
  ): Promise<Notification> {
    const existingNotification = await this.notificationModel
      .findByIdAndUpdate(id, updateNotificationDto, { new: true })
      .exec();

    if (!existingNotification) {
      throw new NotFoundException(`Notificação com ID ${id} não encontrada.`);
    }

    return existingNotification;
  }

  // Deleta uma notificação
  async delete(id: string): Promise<void> {
    const result = await this.notificationModel.deleteOne({ _id: id }).exec();
    if (result.deletedCount === 0) {
      throw new NotFoundException(`Notificação com ID ${id} não encontrada.`);
    }
  }

  // Busca uma notificação por ID
  async findById(id: string): Promise<Notification> {
    const notification = await this.notificationModel.findById(id).exec();
    if (!notification) {
      throw new NotFoundException(`Notificação com ID ${id} não encontrada.`);
    }
    return notification;
  }

  // Busca todas as notificações
  async findAll(
    page: number = 1,
    limit: number = 25,
  ): Promise<{ data: Notification[]; total: number }> {
    const skip = (page - 1) * limit;

    const data = await this.notificationModel
      .find()
      .skip(skip)
      .limit(limit)
      .exec();

    const total = await this.notificationModel.countDocuments().exec(); // Total de documentos

    return { data, total };
  }
}
