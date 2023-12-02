import { Test, TestingModule } from '@nestjs/testing';
import { AlbumService } from './album.service';
import { Repository } from 'typeorm';
import { AlbumEntity } from './album.entity';
import { TypeOrmTestingConfig } from 'src/shared/testing-utils/typeorm-testing-config';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('AlbumService', () => {
  let service: AlbumService;
  let repository: Repository<AlbumEntity>;
  let albumList: AlbumEntity[];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingConfig()],
      providers: [AlbumService],
    }).compile();

    service = module.get<AlbumService>(AlbumService);
    repository = module.get<Repository<AlbumEntity>>(getRepositoryToken(AlbumEntity));
    await seedDatabase();
  });

  const seedDatabase = async () => {
    repository.clear();
    albumList = [];
    for(let i = 0; i < 5; i++){
        const album: AlbumEntity = await repository.save({
        titulo: 'titulo',
        fechaInicio: '01-01-2023',
        fechaFin: '02-02-2023'})
        albumList.push(album);
    }
  }

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return one album', async () => {
    const result = await service.findAlbumById(albumList[0].id);
    expect(result).toEqual(albumList[0]);
  });

  it('shouldnt return one album', async () => {
    const result = await service.findAlbumById('1');
    expect(result).toEqual(undefined);
  });

  it('should create a new album', async () => {
    const newAlbum: AlbumEntity = await repository.save({
        titulo: 'titulo',
        fechaInicio: '01-01-2023',
        fechaFin: '02-02-2023'});
    expect(newAlbum).toEqual(await service.findAlbumById(newAlbum.id));
  });

  it('shouldnt create a new album', async () => {
    const result = await service.createAlbum(undefined);
    expect(result).toEqual(undefined);
  });

  it('should delete an album', async () => {
    const result = await service.deleteAlbumId(albumList[0].id);
    expect(result).toEqual(await service.findAlbumById(albumList[0].id));
  });

  it('shouldnt delete an album', async () => {
    const result = await service.deleteAlbumId('1');
    expect(result).toEqual(undefined);
  });

});
