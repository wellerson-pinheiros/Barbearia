import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuarioModule } from './usuario/usuario.module';
import { AgendamentoModule } from './agendamento/agendamento.module';
import { ProdService } from './data/services/prod.service';
import { DevService } from './data/services/data.service';
import { AuthModule } from './auth/auth.module';
import { AppController } from './app.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Configurações do .env disponíveis globalmente
    }),
    TypeOrmModule.forRootAsync({
      useClass: DevService, // Usa o serviço de configuração do banco
    }),
    UsuarioModule,
    AgendamentoModule,
    AuthModule
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
