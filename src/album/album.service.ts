/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AlbumEntity } from './album.entity';
import { Repository } from 'typeorm';
import { FotoEntity } from 'src/foto/foto.entity';


@Injectable()
export class AlbumService {
    constructor(
        @InjectRepository(AlbumEntity)
        private readonly albumRepository: Repository<AlbumEntity>,

        @InjectRepository(FotoEntity)
        private readonly fotoRepository: Repository<FotoEntity>
    ){}

    async createAlbum(album: AlbumEntity): Promise<AlbumEntity> {
        if(album.titulo == "")
            throw new Error("El titulo no puede estar vacio");
        return await this.albumRepository.save(album);
    }

    async findAlbumById(id: string): Promise<AlbumEntity> {
        const album: AlbumEntity = await this.albumRepository.findOne({where: {id}});
        if (!album)
            throw new Error("El album no existe");
        return album;
    }

    async addPhotoToAlbum(id: string, idFoto: string): Promise<AlbumEntity> {
        const album: AlbumEntity = await this.albumRepository.findOne({where: {id: id}});
        const foto: FotoEntity = await this.fotoRepository.findOne({where: {id: idFoto}});
        if (!album)
            throw new Error("El album no existe");
        album.fotos = [...album.fotos, foto];
        return await this.albumRepository.save(album);
    }

    async deleteAlbumId(id: string) {
        const album: AlbumEntity = await this.albumRepository.findOne({where: {id}});
        if (!album)
            throw new Error("El album no existe");
        if(album.fotos.length > 0)
            throw new Error("El album no puede eliminarse porque tiene fotos asignadas");
        await this.albumRepository.remove(album);
    }
}
