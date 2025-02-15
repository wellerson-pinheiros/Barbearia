import { Body, Controller,  Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Put, UseGuards } from "@nestjs/common";
import { UsuarioService } from "../service/usuario.service";
import { UsuarioEntity } from "../entities/usuario.entity";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { JwtAuthGuard } from "../../auth/guard/jwt-auth.guard";


    
    @ApiTags('Usuario')
    @Controller("/usuarios")
    @ApiBearerAuth()
    export class UsuarioController{
    
        constructor(private readonly usuarioService: UsuarioService){ }
    
        @UseGuards(JwtAuthGuard)
        @Get('/all')
        @HttpCode(HttpStatus.OK)
        findAll(): Promise<UsuarioEntity[]>{
            return this.usuarioService.findAll();
        }
    
        @UseGuards(JwtAuthGuard)
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
    
        @UseGuards(JwtAuthGuard)
        @Put('/atualizar')
        @HttpCode(HttpStatus.OK)
        async update(@Body() usuario: UsuarioEntity): Promise<UsuarioEntity>{
            return this.usuarioService.update(usuario)
        }
    
    }
  
  



