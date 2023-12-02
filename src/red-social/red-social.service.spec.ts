import { Test, TestingModule } from '@nestjs/testing';
import { RedSocialService } from './red-social.service';
import { RedSocialEntity } from './red-social.entity';
import { Repository } from 'typeorm';
import { TypeOrmTestingConfig } from 'src/shared/testing-utils/typeorm-testing-config';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('RedSocialService', () => {
  let service: RedSocialService;
  let repository: Repository<RedSocialEntity>;
  let redSocialList: RedSocialEntity[];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingConfig()],
      providers: [RedSocialService],
    }).compile();

    service = module.get<RedSocialService>(RedSocialService);
    repository = module.get<Repository<RedSocialEntity>>(getRepositoryToken(RedSocialEntity));
    await seedDatabase();
  });

  const seedDatabase = async () => {
    repository.clear();
    redSocialList = [];
    for(let i = 0; i < 5; i++){
        const redSocial: RedSocialEntity = await repository.save({
        nombre: 'nombre',
        slogan: 'slogan'})
        redSocialList.push(redSocial);
    }
  }

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a new redSocial', async () => {
    const newRedSocial: RedSocialEntity = await repository.save({
        nombre: 'nombre',
        slogan: 'slogan'});
    expect(newRedSocial).toEqual(await service.createRedSocial(newRedSocial));
  });

  it('shouldnt create a new redSocial', async () => {
    const result = await service.createRedSocial(undefined);
    expect(result).toEqual(undefined);
  });

});
