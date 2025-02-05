import { IsEmail, IsNotEmpty, Matches, MIN, MinLength } from 'class-validator';
import { AgendamentoEntity } from '../../agendamento/entities/agendamento.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
@Entity({ name: 'tb_usuario' })
export class UsuarioEntity {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: number;

  @Column({ length: 255, nullable: false })
  @ApiProperty()
  nome: string;

  @IsEmail()
  @IsNotEmpty()
  @Column({length:255, nullable: false, unique : true})
  @ApiProperty({example: "email@email.com.br"})
  usuario:string;

  @Matches(/^\+?(\d{2})?\s?\(?\d{2}\)?\s?\d{4,5}-?\d{4}$/) // REGEX PARA ACEITAR todos os formatos de telefone
  @IsNotEmpty()
  @Column()
  @ApiProperty()
  celular: string;

  @MinLength(8)
  @IsNotEmpty()
  @Column({length: 255, nullable : false})
  @ApiProperty()
  senha: string;

  @Column({length: 500, nullable: true})
  @ApiProperty()
  foto:string;

  @ApiProperty({ type: () => AgendamentoEntity})
  @OneToMany(() =>AgendamentoEntity, (agendamento) => agendamento.usuario, {
    onDelete: 'CASCADE',
  })
  agendamento: AgendamentoEntity[];

}
