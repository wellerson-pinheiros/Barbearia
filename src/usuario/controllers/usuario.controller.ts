import { Body, Controller,  Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Put } from "@nestjs/common";
import { UsuarioService } from "../service/usuario.service";
import { UsuarioEntity } from "../entities/usuario.entity";
import { OneToMany } from "typeorm";
import { AgendamentoEntity } from "src/agendamento/entities/agendamento.entity";

@Controller('/usuario')
export class UsarioController{
    constructor(
        private readonly usuarioService : UsuarioService
    ){}

    @Get()
    @HttpCode(HttpStatus.OK)
    findAll(): Promise<UsuarioEntity[]> {
        return this.usuarioService.findAll();
      }

    @Get()
    @HttpCode(HttpStatus.OK) 
    findById(@Param('id', ParseIntPipe) id: number): Promise<UsuarioEntity> {
       return this.usuarioService.findById(id);
     }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    create(@Body() usuario : UsuarioEntity): Promise<UsuarioEntity> {
    return this.usuarioService.create(usuario);
  }

    @Put()
    @HttpCode(HttpStatus.OK)
    update(@Body() usuario :UsuarioEntity): Promise<UsuarioEntity> {
    return this.usuarioService.update(usuario);
  }

  
  



}