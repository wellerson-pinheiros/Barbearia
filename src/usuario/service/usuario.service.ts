import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsuarioEntity } from '../entities/usuario.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsuarioService {
  constructor(
    @InjectRepository(UsuarioEntity)
    private usuarioRepository: Repository<UsuarioEntity>,
  ) {}

  async findAll(): Promise<UsuarioEntity[]> {
    return await this.usuarioRepository.find({
      relations: {
        agendamento: true
      }
    });
  }

  async findById(id: number): Promise<UsuarioEntity> {
    const usuario = await this.usuarioRepository.findOne({
      where: {
        id,
      },
      relations: {
        agendamento: true
      }
    });

    if (!usuario)
      throw new HttpException('Usuario não encontrado!', HttpStatus.NOT_FOUND);

    return usuario;
  }

  async create(usuario: UsuarioEntity): Promise<UsuarioEntity> {
      return await this.usuarioRepository.save(usuario);
    }
  
    async update(usuario: UsuarioEntity): Promise<UsuarioEntity> {
      let buscaUsuario = await this.findById(usuario.id);
  
      if (!buscaUsuario || !usuario.id)
        throw new HttpException(
          'Agendamento não encontrado!',
          HttpStatus.NOT_FOUND,
        );
      return await this.usuarioRepository.save(usuario);
    }
}
