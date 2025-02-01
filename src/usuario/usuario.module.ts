import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuarioEntity } from './entities/usuario.entity';
import { AgendamentoService } from '../agendamento/service/agendamento.service';
import { AgendamentoController } from '../agendamento/controllers/agendamento.controller';
import { UsuarioService } from './service/usuario.service';

import { UsarioController } from './controllers/usuario.controller';
import { AgendamentoModule } from 'src/agendamento/agendamento.module';

@Module({
  imports: [TypeOrmModule.forFeature([UsuarioEntity]),AgendamentoModule],
  exports: [TypeOrmModule],
  providers: [UsuarioService,AgendamentoService],
  controllers: [UsarioController],
})
export class UsuarioModule {}
