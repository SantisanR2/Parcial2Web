/* eslint-disable prettier/prettier */
import { FotoEntity } from "src/foto/foto.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class AlbumEntity {

    @PrimaryGeneratedColumn('uuid')
    id: string;
    
    @Column()
    titulo: string;

    @Column()
    fechaInicio: Date;

    @Column()
    fechaFin: Date;

    @OneToMany(() => FotoEntity, foto => foto.album)
    fotos: FotoEntity[];
}
