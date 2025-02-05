import { AgendamentoService } from '../service/agendamento.service';
import { AgendamentoEntity } from '../entities/agendamento.entity';
import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Body,
  Put,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../auth/guard/jwt-auth.guard';


@ApiTags('Agendamento')
@UseGuards(JwtAuthGuard)
@Controller('/agendamento')
@ApiBearerAuth()
export class AgendamentoController {
  constructor(private readonly agendamentoService: AgendamentoService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  findAll(): Promise<AgendamentoEntity[]> {
    return this.agendamentoService.findAll();
  }

  @Get('/:id')
  @HttpCode(HttpStatus.OK)
  findById(@Param('id', ParseIntPipe) id: number): Promise<AgendamentoEntity> {
    return this.agendamentoService.findById(id);
  }
  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() agendamento: AgendamentoEntity): Promise<AgendamentoEntity> {
    return this.agendamentoService.create(agendamento);
  }

  @Put()
  @HttpCode(HttpStatus.OK)
  update(@Body() agendamento: AgendamentoEntity): Promise<AgendamentoEntity> {
    return this.agendamentoService.update(agendamento);
  }

  @Delete('/id')
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.agendamentoService.delete(id);
  }
}
