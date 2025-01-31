import { TypeOrmModule } from "@nestjs/typeorm";
import { AgendamentoEntity } from "./entities/agendamento.entity";
import { AgendamentoController } from "./controllers/agendamento.controller";
import { AgendamentoService } from "./service/agendamento.service";
import { Module } from "@nestjs/common";



@Module({
  imports: [TypeOrmModule.forFeature([AgendamentoEntity])],
  controllers: [AgendamentoController],
  providers: [AgendamentoService],
  exports: [TypeOrmModule],
})
export class AgendamentoModule {}
