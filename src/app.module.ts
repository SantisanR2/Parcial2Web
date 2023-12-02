/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FotoModule } from './foto/foto.module';
import { AlbumModule } from './album/album.module';
import { UsuarioModule } from './usuario/usuario.module';
import { RedSocialModule } from './red-social/red-social.module';
import { UsuarioEntity } from './usuario/usuario.entity';
import { FotoEntity } from './foto/foto.entity';
import { AlbumEntity } from './album/album.entity';
import { RedSocialEntity } from './red-social/red-social.entity';

@Module({
  imports: [UsuarioModule, FotoModule, AlbumModule, RedSocialModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'parcial',
      entities: [UsuarioEntity, FotoEntity, AlbumEntity, RedSocialEntity],
      dropSchema: true,
      synchronize: true,
      keepConnectionAlive: true
    }),
    FotoModule,
    AlbumModule,
    UsuarioModule,
    RedSocialModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
