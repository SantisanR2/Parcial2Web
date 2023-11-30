/* eslint-disable prettier/prettier */
import { UsuarioEntity } from "src/usuario/usuario.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class RedSocialEntity {

    @PrimaryGeneratedColumn('uuid')
    id: string;
    
    @Column()
    nombre: string;

    @Column()
    eslogan: string;

    @OneToMany(() => UsuarioEntity, usuario => usuario.redSocial)
    usuarios: UsuarioEntity[];
}
