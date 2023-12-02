/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { FotoService } from './foto.service';
import { FotoEntity } from './foto.entity';
import { TypeOrmTestingConfig } from '../../src/shared/testing-utils/typeorm-testing-config';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';

import { faker } from '@faker-js/faker';

describe('FotoService', () => {
  let service: FotoService;
  let repository: Repository<FotoEntity>;
  let fotoList: FotoEntity[];
 
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingConfig()],
      providers: [FotoService],
    }).compile();
 
    service = module.get<FotoService>(FotoService);
    repository = module.get<Repository<FotoEntity>>(getRepositoryToken(FotoEntity));
    await seedDatabase();
  });

  const seedDatabase = async () => {
    repository.clear();
    fotoList = [];
    for(let i = 0; i < 5; i++){
        const foto: FotoEntity = await repository.save({
        fecha: faker.lorem.word(),
        apertura: 2,
        ISO: 100})
        fotoList.push(foto);
    }
  }
   
  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return all the fotos', async () => {
    const result = await service.findAllFotos();
    expect(result).toEqual(fotoList);
  });

  it('should return one foto', async () => {
    const result = await service.findFotoById(fotoList[0].id);
    expect(result).toEqual(fotoList[0]);
  });

  it('shoulnt return one foto', async () => {
    const result = await service.findFotoById('1');
    expect(result).toEqual(undefined);
  });

  it('should create a new foto', async () => {
    const newFoto: FotoEntity = await repository.save({
        fecha: faker.lorem.word(),
        apertura: 2,
        ISO: 100});
    const result = await service.createFoto(newFoto);
    expect(result).toEqual(newFoto);
  });

  it('shouldnt create a new foto', async () => {
    const result = await service.createFoto(undefined);
    expect(result).toEqual(undefined);
  });

  it('should delete a foto', async () => {
    const result = await service.deleteFoto(fotoList[0].id);
    expect(result).toEqual(fotoList[0]);
  });

  it('shouldnt delete a foto', async () => {
    const result = await service.deleteFoto('1');
    expect(result).toEqual(undefined);
  });
 
 });
