import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuarioEntity } from './entities/usuario.entity';
import { AgendamentoService } from '../agendamento/service/agendamento.service';

import { UsuarioService } from './service/usuario.service';


import { AgendamentoModule } from 'src/agendamento/agendamento.module';
import { UsuarioController } from './controllers/usuario.controller';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([UsuarioEntity]),AgendamentoModule,
forwardRef(()=> AuthModule)],
  exports: [TypeOrmModule],
  providers: [UsuarioService,AgendamentoService],
  controllers: [UsuarioController],
})
export class UsuarioModule {}
