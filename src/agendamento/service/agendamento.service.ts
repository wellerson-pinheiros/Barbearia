import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AgendamentoEntity } from '../entities/agendamento.entity';
import { DeleteResult, Repository } from 'typeorm';

@Injectable()
export class AgendamentoService {
  constructor(
    @InjectRepository(AgendamentoEntity)
    private agendamentoRepository: Repository<AgendamentoEntity>,
  ) {}

  async findAll(): Promise<AgendamentoEntity[]> {
    return await this.agendamentoRepository.find({
      relations: {
        usuario: true
      }
    });
  }

  async findById(id: number): Promise<AgendamentoEntity> {
    const agendamento = await this.agendamentoRepository.findOne({
      where: {
        id,
      },
      relations: {
        usuario: true
      }
    });

    if (!agendamento)
      throw new HttpException(
        'Agendamento não encontrado!',
        HttpStatus.NOT_FOUND,
      );

    return agendamento;
  }

  async create(agendamento: AgendamentoEntity): Promise<AgendamentoEntity> {
    return await this.agendamentoRepository.save(agendamento);
  }

  async update(agendamento: AgendamentoEntity): Promise<AgendamentoEntity> {
    let buscaAgendamento = await this.findById(agendamento.id);

    if (!buscaAgendamento || !agendamento.id)
      throw new HttpException(
        'Agendamento não encontrado!',
        HttpStatus.NOT_FOUND,
      );
    return await this.agendamentoRepository.save(agendamento);
  }

  async delete(id: number): Promise<DeleteResult> {
    await this.findById(id);
    return await this.agendamentoRepository.delete(id);
  }
}
