import { Test, TestingModule } from '@nestjs/testing';
import { FazendaController } from '../controllers/fazenda.controller';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateFazendaDto } from '../dto/create-fazenda.dto';
import { CreateFazendaCommand } from '../commands/create-fazenda.command';
import { UpdateFazendaCommand } from '../commands/update-fazenda.command';
import { FindAllFazendasQuery } from '../queries/find-all-fazenda.query';
import { FindFazendaByIdQuery } from '../queries/find-fazenda-by-id.query';
import { Fazenda } from '../entities/fazenda.entity';

/**
 * @module Fazenda
 * @category Controller Tests
 *
 * @description
 * Testes unitários para o `FazendaController`, garantindo que os endpoints
 * acionam corretamente os comandos e queries via CQRS (CommandBus e QueryBus).
 *
 * As dependências são mockadas para isolar o controller.
 */
describe('FazendaController', () => {
  let controller: FazendaController;
  let commandBus: { execute: jest.Mock };
  let queryBus: { execute: jest.Mock };

  beforeEach(async () => {
    commandBus = { execute: jest.fn() };
    queryBus = { execute: jest.fn() };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [FazendaController],
      providers: [
        { provide: CommandBus, useValue: commandBus },
        { provide: QueryBus, useValue: queryBus },
      ],
    }).compile();

    controller = module.get<FazendaController>(FazendaController);
  });

  it('deve criar uma fazenda', async () => {
    const dto: CreateFazendaDto = {
      nome: 'Fazenda Modelo',
      areaTotal: 120,
      areaAgricultavel: 80,
      areaVegetacao: 30,
      produtorId: 'produtor-uuid',
    };

    commandBus.execute.mockResolvedValue(undefined);

    const result = await controller.create(dto);

    expect(commandBus.execute).toHaveBeenCalledWith(new CreateFazendaCommand(dto));
    expect(result).toBeUndefined();
  });

  it('deve buscar todas as fazendas', async () => {
    const lista: Fazenda[] = [];

    queryBus.execute.mockResolvedValue(lista);

    const result = await controller.findAll();

    expect(queryBus.execute).toHaveBeenCalledWith(new FindAllFazendasQuery());
    expect(result).toEqual(lista);
  });

  it('deve buscar fazenda por ID', async () => {
    const id = 'uuid';
    const fazenda: Fazenda = {
      id,
      nome: 'Fazenda Modelo',
      areaTotal: 100,
      areaAgricultavel: 60,
      areaVegetacao: 30,
      produtorId: 'produtor-uuid',
      criadoEm: new Date(),
      atualizadoEm: new Date(),
    };

    queryBus.execute.mockResolvedValue(fazenda);

    const result = await controller.findById(id);

    expect(queryBus.execute).toHaveBeenCalledWith(new FindFazendaByIdQuery(id));
    expect(result).toEqual(fazenda);
  });

  it('deve atualizar parcialmente uma fazenda', async () => {
    const id = 'uuid';
    const dto: Partial<CreateFazendaDto> = {
      nome: 'Atualizada',
    };

    commandBus.execute.mockResolvedValue(undefined);

    const result = await controller.update(id, dto);

    expect(commandBus.execute).toHaveBeenCalledWith(new UpdateFazendaCommand(id, dto));
    expect(result).toBeUndefined();
  });
});
