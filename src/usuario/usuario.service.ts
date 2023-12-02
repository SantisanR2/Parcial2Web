/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsuarioEntity } from './usuario.entity';

@Injectable()
export class UsuarioService {
    constructor(
        @InjectRepository(UsuarioEntity)
        private readonly usuarioRepository: Repository<UsuarioEntity>
    ){}

    async createUsuario(usuario: UsuarioEntity): Promise<UsuarioEntity> {
        if(usuario.telefono.length != 10)
            throw new Error("El telefono solo puede tener 10 caracteres");
        return await this.usuarioRepository.save(usuario);
    }

    async findUsuariobyId(id: string): Promise<UsuarioEntity> {
        const usuario: UsuarioEntity = await this.usuarioRepository.findOne({where: {id}});
        if (!usuario)
            throw new Error("El usuario no existe");
        return usuario;
    }

    async findAllUsuarios(): Promise<UsuarioEntity[]> {
        return await this.usuarioRepository.find();
    }

}
