/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FotoModule } from './foto/foto.module';
import { AlbumModule } from './album/album.module';
import { UsuarioModule } from './usuario/usuario.module';
import { RedSocialModule } from './red-social/red-social.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'Monita156',
      database: 'museum',
      entities: [],
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
