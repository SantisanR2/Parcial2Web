/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, UseInterceptors } from '@nestjs/common';
import { RedSocialService } from './red-social.service';

@Controller('red-social')
export class RedSocialController {
    constructor(private readonly redSocialService: RedSocialService) {}

    @Post()
    createRedSocial(@Body() redSocial: any) {
        return this.redSocialService.createRedSocial(redSocial);
    }
}
