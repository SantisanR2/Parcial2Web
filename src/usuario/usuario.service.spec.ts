import { Test, TestingModule } from '@nestjs/testing';
import { UsuarioService } from './usuario.service';
import { UsuarioEntity } from './usuario.entity';
import { Repository } from 'typeorm';
import { TypeOrmTestingConfig } from 'src/shared/testing-utils/typeorm-testing-config';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('UsuarioService', () => {
  let service: UsuarioService;
  let repository: Repository<UsuarioEntity>;
  let usuarioList: UsuarioEntity[];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingConfig()],
      providers: [UsuarioService],
    }).compile();

    service = module.get<UsuarioService>(UsuarioService);
    repository = module.get<Repository<UsuarioEntity>>(getRepositoryToken(UsuarioEntity));
    await seedDatabase();
  });

  const seedDatabase = async () => {
    repository.clear();
    usuarioList = [];
    for(let i = 0; i < 5; i++){
        const usuario: UsuarioEntity = await repository.save({
        nombre: 'nombre',
        telefono: '3021562457'})
        usuarioList.push(usuario);
    }
  }

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return all the usuarios', async () => {
    const result = await service.findAllUsuarios();
    expect(result).toEqual(usuarioList);
  });

  it('should return one usuario', async () => {
    const result = await service.findUsuariobyId(usuarioList[0].id);
    expect(result).toEqual(usuarioList[0]);
  });

  it('shouldnt return one usuario', async () => {
    const result = await service.findUsuariobyId('1');
    expect(result).toEqual(undefined);
  });

  it('should create a new usuario', async () => {
    const newUsuario: UsuarioEntity = await repository.save({
        nombre: 'nombre',
        telefono: '3021562457'});
    expect(newUsuario).toEqual(await service.createUsuario(newUsuario));
  });

  it('shouldnt create a new usuario', async () => {
    const result = await service.createUsuario(undefined);
    expect(result).toEqual(undefined);
  });
});
