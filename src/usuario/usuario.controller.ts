/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, UseInterceptors } from '@nestjs/common';
import { UsuarioService } from './usuario.service';

@Controller('usuario')
export class UsuarioController {
    constructor(private readonly usuarioService: UsuarioService) {}

    @Post()
    async createUsuario(@Body() usuario: any) {
        return await this.usuarioService.createUsuario(usuario);
    }

    @Get(':id')
    async findUsuariobyId(@Param('id') id: string) {
        return await this.usuarioService.findUsuariobyId(id);
    }

    @Get()
    async findAllUsuarios() {
        return await this.usuarioService.findAllUsuarios();
    }
}
