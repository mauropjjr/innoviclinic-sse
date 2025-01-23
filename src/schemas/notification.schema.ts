import { Schema, Document } from 'mongoose';

// Definindo o schema para o objeto paciente
const PacienteSchema = new Schema({
  id: { type: Number, required: true },
  nome: { type: String, required: true },
  celular: { type: String, required: true },
});

export const AgendaSchema = new Schema({
  id: { type: Number, required: true },
  data: { type: Date, required: false, default: new Date() },
  hora_ini: { type: String, required: true },
  hora_fim: { type: String, required: true },
  paciente: { type: PacienteSchema, required: true },
});

//tipo: agendamento, reagendamento, cancelamento
export const NotificationSchema = new Schema(
  {
    profissional_id: { type: Number, required: true },
    empresa_id: { type: Number, required: true },
    data: { type: Date, required: true },
    tipo: { type: String, required: true },
    mensagem: { type: String, required: true },
    origem: { type: String, required: true },
    agenda: { type: AgendaSchema, required: false },
  },
  {
    timestamps: true,
  },
);

// Definindo a interface para o documento Agenda
export interface Notification extends Document {
  profissional_id: number;
  empresa_id: number;
  data: Date;
  tipo: string;
  origem: string;
  mensagem: string;
  agenda: {
    id: number;
    data: Date;
    hora_ini: string;
    hora_fim: string;
    paciente: {
      id: number;
      nome: string;
      celular: string;
    };
  };
  timestamps: true;
}
