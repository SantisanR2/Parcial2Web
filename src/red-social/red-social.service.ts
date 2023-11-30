/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RedSocialEntity } from './red-social.entity';

@Injectable()
export class RedSocialService {
    constructor(
        @InjectRepository(RedSocialEntity)
        private readonly redSocialRepository: Repository<RedSocialEntity>
    ){}

    async createRedSocial(redSocial: RedSocialEntity): Promise<RedSocialEntity> {
        if(redSocial.slogan == "" && redSocial.slogan.length > 20)
            throw new Error("El slogan no puede estar vacio y debe tener minimo 20 caracteres");
        return await this.redSocialRepository.save(redSocial);
    }
}
