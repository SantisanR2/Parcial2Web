/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FotoEntity } from './foto.entity';
import { AlbumEntity } from 'src/album/album.entity';

@Injectable()
export class FotoService {
    constructor(
        @InjectRepository(FotoEntity)
        private readonly fotoRepository: Repository<FotoEntity>,

        @InjectRepository(AlbumEntity)
        private readonly albumRepository: Repository<AlbumEntity>
    ){}

    async createFoto(foto: FotoEntity): Promise<FotoEntity> {
        if(foto.ISO < 100 && foto.ISO > 6400)
            throw new Error("El ISO debe estar entre valores fijos de 100 y 6400");
        if(foto.velObturacion < 2 && foto.velObturacion > 250)
            throw new Error("La obturacion debe estar entre 2 y 250");
        if(foto.apertura < 1 && foto.apertura > 32)
            throw new Error("La apertura debe estar entre 1 y 32");
        if(foto.ISO > 3250 && foto.velObturacion > 126 && foto.apertura > 16)
            throw new Error("Max 2 de sus propiedades pueden estar por encima del promedio de sus cotas");
        return await this.fotoRepository.save(foto);
    }

    async findFotoById(id: string): Promise<FotoEntity> {
        const foto: FotoEntity = await this.fotoRepository.findOne({where: {id}});
        if (!foto)
            throw new Error("La foto no existe");
        return foto;
    }

    async findAllFotos(): Promise<FotoEntity[]> {
        return this.fotoRepository.find();
    }

    async deleteFoto(id: string) {
        const foto: FotoEntity = await this.fotoRepository.findOne({where: {id}});
        if (!foto)
            throw new Error("La foto no existe");
        if(foto.album.fotos.length == 1)
            this.albumRepository.remove(foto.album);
        await this.fotoRepository.remove(foto);
    }
}
