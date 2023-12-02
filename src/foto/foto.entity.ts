/* eslint-disable prettier/prettier */
import { AlbumEntity } from "src/album/album.entity";
import { UsuarioEntity } from "src/usuario/usuario.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class FotoEntity {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    fecha: string;

    @Column()
    apertura: number;

    @Column()
    velObturacion: number;

    @Column()
    ISO: number;

    @ManyToOne(() => UsuarioEntity, usuario => usuario.fotos)
    usuario: UsuarioEntity;

    @ManyToOne(() => AlbumEntity, album => album.fotos)
    album: AlbumEntity;
}
