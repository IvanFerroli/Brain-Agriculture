import { Test, TestingModule } from '@nestjs/testing';
import { CulturaController } from '../controllers/cultura.controller';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateCulturaDto } from '../dto/create-cultura.dto';
import { CreateCulturaCommand } from '../commands/create-cultura.command';
import { UpdateCulturaCommand } from '../commands/update-cultura.command';
import { FindAllCulturaQuery } from '../queries/find-all-cultura.query';
import { FindCulturaByIdQuery } from '../queries/find-cultura-by-id.query';
import { Cultura } from '../entities/cultura.entity';

/**
 * @module Cultura
 * @category Controller Tests
 *
 * @description
 * Testes unitários para o `CulturaController`, garantindo que os endpoints
 * acionam corretamente os comandos e queries via CQRS (CommandBus e QueryBus).
 *
 * As dependências são mockadas para isolar o controller.
 */
describe('CulturaController', () => {
  let controller: CulturaController;
  let commandBus: { execute: jest.Mock };
  let queryBus: { execute: jest.Mock };

  beforeEach(async () => {
    commandBus = { execute: jest.fn() };
    queryBus = { execute: jest.fn() };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [CulturaController],
      providers: [
        { provide: CommandBus, useValue: commandBus },
        { provide: QueryBus, useValue: queryBus },
      ],
    }).compile();

    controller = module.get<CulturaController>(CulturaController);
  });

  it('deve criar uma cultura', async () => {
    const dto: CreateCulturaDto = {
      nome: 'Soja',
      safraId: 'uuid-safra',
      fazendaId: 'uuid-fazenda',
    };

    const culturaCriada: Cultura = {
      id: 'uuid',
      nome: dto.nome,
      safraId: dto.safraId,
      criadoEm: new Date(),
      atualizadoEm: new Date(),
    };

    commandBus.execute.mockResolvedValue(culturaCriada);

    const result = await controller.create(dto);

    expect(commandBus.execute).toHaveBeenCalledWith(new CreateCulturaCommand(dto));
    expect(result).toEqual(culturaCriada);
  });

  it('deve retornar todas as culturas', async () => {
    const lista: Cultura[] = [];

    queryBus.execute.mockResolvedValue(lista);

    const result = await controller.findAll();

    expect(queryBus.execute).toHaveBeenCalledWith(new FindAllCulturaQuery());
    expect(result).toEqual(lista);
  });

  it('deve retornar uma cultura pelo ID', async () => {
    const id = 'uuid';
    const cultura: Cultura = {
      id,
      nome: 'Milho',
      safraId: 'uuid-safra',
      criadoEm: new Date(),
      atualizadoEm: new Date(),
    };

    queryBus.execute.mockResolvedValue(cultura);

    const result = await controller.findById(id);

    expect(queryBus.execute).toHaveBeenCalledWith(new FindCulturaByIdQuery(id));
    expect(result).toEqual(cultura);
  });

  it('deve atualizar uma cultura parcialmente', async () => {
    const id = 'uuid';
    const dto: Partial<CreateCulturaDto> = {
      nome: 'Novo Nome',
    };

    const culturaAtualizada: Cultura = {
      id,
      nome: dto.nome!,
      safraId: 'uuid-safra',
      criadoEm: new Date(),
      atualizadoEm: new Date(),
    };

    commandBus.execute.mockResolvedValue(culturaAtualizada);

    const result = await controller.update(id, dto);

    expect(commandBus.execute).toHaveBeenCalledWith(new UpdateCulturaCommand(id, dto));
    expect(result).toEqual(culturaAtualizada);
  });
});
