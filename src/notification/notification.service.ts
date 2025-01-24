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
    console.log('salvar notificacao');
    console.log(notification);
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
  async findAll(profissionalId: number, page: number = 1, limit: number = 20) {
    const skip = (page - 1) * limit;
    const today = new Date(); // Data atual
    const startOfYesterday = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate() - 1,
    );
    // Filtro para profissional_id e createdAt maior que hoje
    const filter = {
      profissional_id: profissionalId,
      createdAt: { $gte: startOfYesterday }, // createdAt maior que a data atual
    };

    // Busca as notificações filtradas e ordenadas por createdAt (mais recentes primeiro)
    const data = await this.notificationModel
      .find(filter)
      .sort({ createdAt: -1 }) // Ordena por createdAt em ordem decrescente
      .skip(skip)
      .limit(limit)
      .exec();

    // Conta o total de notificações que correspondem ao filtro
    const total = await this.notificationModel.countDocuments(filter).exec();

    return {
      data,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }
}
