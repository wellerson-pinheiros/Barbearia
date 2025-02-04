import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsuarioEntity } from '../entities/usuario.entity';
import { Repository } from 'typeorm';
import { Bcrypt } from 'src/auth/bcrypt/bcrypt';

@Injectable()
export class UsuarioService {
  constructor(
    @InjectRepository(UsuarioEntity)
    private usuarioRepository: Repository<UsuarioEntity>,
    private bcrypt: Bcrypt
  ) {}


  async findByUsuario(usuario: string): Promise<UsuarioEntity | null> {
    return await this.usuarioRepository.findOne({
        where: {
            usuario: usuario
        }
    })
}



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
        
    let buscaUsuario = await this.findByUsuario(usuario.usuario);

    if (!buscaUsuario) {
        usuario.senha = await this.bcrypt.criptografarSenha(usuario.senha)
        return await this.usuarioRepository.save(usuario);
    }

    throw new HttpException("O Usuário (e-mail) já existe!", HttpStatus.BAD_REQUEST);

}
  
    async update(usuario: UsuarioEntity): Promise<UsuarioEntity> {

      await this.findById(usuario.id);

      const buscaUsuario = await this.findByUsuario(usuario.usuario);

      if (buscaUsuario && buscaUsuario.id !== usuario.id)
          throw new HttpException('Usuário (e-mail) já Cadastrado!', HttpStatus.BAD_REQUEST);

      usuario.senha = await this.bcrypt.criptografarSenha(usuario.senha)
      return await this.usuarioRepository.save(usuario);

  }
}
