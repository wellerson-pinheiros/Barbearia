import { JwtService } from '@nestjs/jwt';
import { Injectable, Inject, forwardRef, HttpException, HttpStatus } from '@nestjs/common';
import { Bcrypt } from '../bcrypt/bcrypt';
import { UsuarioLogin } from '../entities/usuariologin.entity';
import { UsuarioService } from '../../usuario/service/usuario.service';

@Injectable()
export class AuthService {
    constructor(
        @Inject(forwardRef(() => UsuarioService)) // 🔹 Para resolver dependências circulares
        private usuarioService: UsuarioService,
        private jwtService: JwtService,
        private bcrypt: Bcrypt
    ) {}

    async validateUser(username: string, password: string): Promise<any> {
        const buscaUsuario = await this.usuarioService.findByUsuario(username);

        if (!buscaUsuario) {
            console.log(`Usuário ${username} não encontrado.`);
            throw new HttpException('Usuário não encontrado!', HttpStatus.NOT_FOUND);
        }

        const matchPassword = await this.bcrypt.compararSenhas(password, buscaUsuario.senha);

        if (matchPassword) {
            const { senha, ...resposta } = buscaUsuario;
            return resposta;
        }

        throw new HttpException('Senha incorreta!', HttpStatus.UNAUTHORIZED);
    }

    async login(usuarioLogin: UsuarioLogin) {
        const buscaUsuario = await this.usuarioService.findByUsuario(usuarioLogin.usuario);

        if (!buscaUsuario) {
            console.log(`Login falhou: usuário ${usuarioLogin.usuario} não encontrado.`);
            throw new HttpException('Usuário não encontrado!', HttpStatus.NOT_FOUND);
        }

        const payload = { sub: buscaUsuario.id, usuario: buscaUsuario.usuario };

        return {
            id: buscaUsuario.id,
            nome: buscaUsuario.nome,
            usuario: buscaUsuario.usuario,
            senha: '', // Não retornar a senha por segurança
            foto: buscaUsuario.foto,
            token: `Bearer ${this.jwtService.sign(payload)}`,
        };
    }
}
