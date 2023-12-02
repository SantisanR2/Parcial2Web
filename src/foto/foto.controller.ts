/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, UseInterceptors } from '@nestjs/common';
import { FotoService } from './foto.service';

@Controller('foto')
export class FotoController {
    constructor(private readonly fotoService: FotoService) {}

    @Post()
    async createFoto(@Body() foto: any) {
        return await this.fotoService.createFoto(foto);
    }

    @Get(':id')
    async findFotoById(@Param('id') id: string) {
        return await this.fotoService.findFotoById(id);
    }

    @Get()
    async findAllFotos() {
        return await this.fotoService.findAllFotos();
    }

    @Delete(':id')
    @HttpCode(204)
    async deleteFoto(@Param('id') id: string) {
        return await this.fotoService.deleteFoto(id);
    }
}
