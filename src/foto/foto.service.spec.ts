/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { FotoService } from './foto.service';
import { FotoEntity } from './foto.entity';
import { TypeOrmTestingConfig } from 'src/shared/testing-utils/typeorm-testing-config';
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
   
  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  const seedDatabase = async () => {
    repository.clear();
    fotoList = [];
    for(let i = 0; i < 5; i++){
        const foto: FotoEntity = await repository.save({
        fecha: faker.date.past(),
        apertura: 2,
        ISO: 3})
        fotoList.push(foto);
    }
  }
 
 });
