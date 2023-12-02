/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, UseInterceptors } from '@nestjs/common';
import { AlbumService } from './album.service';

@Controller('album')
export class AlbumController {
    constructor(private readonly albumService: AlbumService) {}

    @Post()
    async createAlbum(@Body() album: any) {
        return await this.albumService.createAlbum(album);
    }

    @Get(':id')
    async findAlbumById(@Param('id') id: string) {
        return await this.albumService.findAlbumById(id);
    }

    @Put(':id')
    async addPhotoToAlbum(@Param('id') id: string, @Body() idFoto: any) {
        return await this.albumService.addPhotoToAlbum(id, idFoto);
    }

    @Delete(':id')
    @HttpCode(204)
    async deleteAlbumId(@Param('id') id: string) {
        return await this.albumService.deleteAlbumId(id);
    }
}
