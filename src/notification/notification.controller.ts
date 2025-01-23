import {
  Body,
  Controller,
  Post,
  Put,
  Get,
  Delete,
  Param,
  Query,
} from '@nestjs/common';
import { NotificationService } from './notification.service';
import { NotificationDto } from '../dtos/notification.dto';

@Controller('notification')
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @Post()
  async create(@Body() createNotificationDto: NotificationDto) {
    return this.notificationService.create(createNotificationDto);
  }
  // Atualiza uma notificação existente
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateNotificationDto: NotificationDto,
  ) {
    return this.notificationService.update(id, updateNotificationDto);
  }

  // Deleta uma notificação
  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.notificationService.delete(id);
  }

  // Busca uma notificação por ID
  @Get(':id')
  async findById(@Param('id') id: string) {
    return this.notificationService.findById(id);
  }

  // Busca todas as notificações
  @Get()
  async findAll(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 2,
  ) {
    return this.notificationService.findAll(page, limit);
  }
}
