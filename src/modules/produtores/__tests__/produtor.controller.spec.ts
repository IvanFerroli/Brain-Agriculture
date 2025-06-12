import { Test, TestingModule } from '@nestjs/testing';
import { ProdutorController } from '../controllers/produtor.controller';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateProdutorDto } from '../dto/create-produtor.dto';
import { CreateProdutorCommand } from '../commands/create-produtor.command';
import { FindAllProdutoresQuery } from '../queries/find-all-produtores.query';
import { FindProdutorByIdQuery } from '../queries/find-produtor-by-id.query';
import { UpdateProdutorCommand } from '../commands/update-produtor.command';
import { Produtor } from '../entities/produtor.entity';

/**
 * @module Produtor
 * @category Controller Tests
 *
 * @description
 * Testes unitários para o `ProdutorController`, garantindo que os endpoints
 * acionam corretamente os comandos e queries via CQRS (CommandBus e QueryBus).
 *
 * As dependências são mockadas para isolar o controller.
 */
describe('ProdutorController', () => {
  let controller: ProdutorController;
  let commandBus: { execute: jest.Mock };
  let queryBus: { execute: jest.Mock };

  beforeEach(async () => {
    commandBus = { execute: jest.fn() };
    queryBus = { execute: jest.fn() };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProdutorController],
      providers: [
        { provide: CommandBus, useValue: commandBus },
        { provide: QueryBus, useValue: queryBus },
      ],
    }).compile();

    controller = module.get<ProdutorController>(ProdutorController);
  });

  it('deve criar um produtor', async () => {
    const dto: CreateProdutorDto = {
      nome: 'João',
      documento: '12345678900',
    };

    const produtorCriado: Produtor = {
      id: 'uuid',
      nome: dto.nome,
      documento: dto.documento,
      criadoEm: new Date(),
      atualizadoEm: new Date(),
    };

    commandBus.execute.mockResolvedValue(produtorCriado);

    const result = await controller.create(dto);

    expect(commandBus.execute).toHaveBeenCalledWith(new CreateProdutorCommand(dto));
    expect(result).toEqual(produtorCriado);
  });

  it('deve buscar todos os produtores', async () => {
    const lista: Produtor[] = [];

    queryBus.execute.mockResolvedValue(lista);

    const result = await controller.findAll();

    expect(queryBus.execute).toHaveBeenCalledWith(new FindAllProdutoresQuery());
    expect(result).toEqual(lista);
  });

  it('deve buscar produtor por ID', async () => {
    const id = 'uuid';
    const produtor: Produtor = {
      id,
      nome: 'João',
      documento: '12345678900',
      criadoEm: new Date(),
      atualizadoEm: new Date(),
    };

    queryBus.execute.mockResolvedValue(produtor);

    const result = await controller.findById(id);

    expect(queryBus.execute).toHaveBeenCalledWith(new FindProdutorByIdQuery(id));
    expect(result).toEqual(produtor);
  });

  it('deve atualizar um produtor parcialmente', async () => {
    const id = 'uuid';
    const dto: Partial<CreateProdutorDto> = {
      nome: 'Novo Nome',
    };

    const produtorAtualizado: Produtor = {
      id,
      nome: dto.nome!,
      documento: '12345678900',
      criadoEm: new Date(),
      atualizadoEm: new Date(),
    };

    commandBus.execute.mockResolvedValue(produtorAtualizado);

    const result = await controller.update(id, dto);

    expect(commandBus.execute).toHaveBeenCalledWith(new UpdateProdutorCommand(id, dto));
    expect(result).toEqual(produtorAtualizado);
  });
});
