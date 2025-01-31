import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: "tb_agendamentos" })
export class AgendamentoEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  dataHora: Date;
}
