import { IsNotEmpty, Matches } from 'class-validator';
import { AgendamentoEntity } from '../../agendamento/entities/agendamento.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
@Entity({ name: 'tb_usuario' })
export class UsuarioEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255, nullable: false })
  nome: string;

  @Matches(/^\+?(\d{2})?\s?\(?\d{2}\)?\s?\d{4,5}-?\d{4}$/) // REGEX PARA ACEITAR todos os formatos de telefone
  @IsNotEmpty()
  @Column()
  celular: string;

  @OneToMany(() =>AgendamentoEntity, (agendamento) => agendamento.usuario, {
    onDelete: 'CASCADE',
  })
  agendamento: AgendamentoEntity[];

}
