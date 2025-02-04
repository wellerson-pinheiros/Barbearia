import { Body, Controller,  Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Put } from "@nestjs/common";
import { UsuarioService } from "../service/usuario.service";
import { UsuarioEntity } from "../entities/usuario.entity";


    
    
    @Controller("/usuarios")
    export class UsuarioController{
    
        constructor(private readonly usuarioService: UsuarioService){ }
    
        @Get('/all')
        @HttpCode(HttpStatus.OK)
        findAll(): Promise<UsuarioEntity[]>{
            return this.usuarioService.findAll();
        }
    
        @Get('/:id')
        @HttpCode(HttpStatus.OK)
        findById(@Param('id', ParseIntPipe) id: number): Promise<UsuarioEntity>{
            return this.usuarioService.findById(id)
        }
    
        @Post('/cadastrar')
        @HttpCode(HttpStatus.CREATED)
        async create(@Body() usuario: UsuarioEntity): Promise<UsuarioEntity>{
            return this.usuarioService.create(usuario)
        }
    
        @Put('/atualizar')
        @HttpCode(HttpStatus.OK)
        async update(@Body() usuario: UsuarioEntity): Promise<UsuarioEntity>{
            return this.usuarioService.update(usuario)
        }
    
    }
  
  



