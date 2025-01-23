import {
  IsString,
  IsDateString,
  IsNotEmpty,
  IsObject,
  IsNumber,
  ValidateNested,
  IsOptional,
} from 'class-validator';
import { Type } from 'class-transformer';

// DTO para o objeto paciente
class PacienteDto {
  @IsNumber()
  id: number;

  @IsString()
  @IsNotEmpty()
  nome: string;

  @IsString()
  @IsNotEmpty()
  celular: string;
}

// DTO para o objeto agenda
class AgendaDto {
  @IsNumber()
  id: number;

  @IsDateString()
  @IsNotEmpty()
  data: Date;

  @IsString()
  @IsNotEmpty()
  hora_ini: string;

  @IsString()
  @IsNotEmpty()
  hora_fim: string;

  @IsObject()
  @ValidateNested()
  @Type(() => PacienteDto)
  paciente: PacienteDto;
}

// DTO principal para a notificação
export class NotificationDto {
  @IsDateString()
  @IsNotEmpty()
  data: Date;

  @IsNumber()
  empresa_id: number;

  @IsNumber()
  profissional_id: number;

  @IsString()
  @IsNotEmpty()
  tipo: string;

  @IsString()
  @IsNotEmpty()
  origem: string;

  @IsString()
  @IsNotEmpty()
  mensagem: string;

  @IsObject()
  @ValidateNested()
  @Type(() => AgendaDto)
  @IsOptional()
  agenda: AgendaDto;
}
export class UpdateNotificationDto {
  @IsString()
  @IsOptional()
  id: string;

  @IsDateString()
  @IsOptional()
  data: Date;

  @IsString()
  @IsOptional()
  tipo: string;

  @IsString()
  @IsOptional()
  mensagem: string;

  @IsObject()
  @ValidateNested()
  @Type(() => AgendaDto)
  @IsOptional()
  agenda: AgendaDto;
}
