import { ApiProperty } from '@nestjs/swagger';
import { UsuarioEntity } from 'src/usuario/entities/usuario.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'tb_agendamentos' })
export class AgendamentoEntity {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: number;

  @Column({ nullable: false })
  @ApiProperty()
  dataHora: Date;

  @ApiProperty({ type: () => UsuarioEntity })
  @ManyToOne(() => UsuarioEntity, (usuario) => usuario.agendamento, {
    onDelete: 'CASCADE',
  })
  usuario: UsuarioEntity;
}

