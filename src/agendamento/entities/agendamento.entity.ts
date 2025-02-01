import { UsuarioEntity } from 'src/usuario/entities/usuario.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'tb_agendamentos' })
export class AgendamentoEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  dataHora: Date;

  @ManyToOne(() => UsuarioEntity, (usuario) => usuario.agendamento, {
    onDelete: 'CASCADE',
  })
  usuario: UsuarioEntity;
}

