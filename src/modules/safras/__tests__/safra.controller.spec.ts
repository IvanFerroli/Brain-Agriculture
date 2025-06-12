import { Test, TestingModule } from '@nestjs/testing';
import { SafraController } from '../controllers/safra.controller';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateSafraDto } from '../dto/create-safra.dto';
import { CreateSafraCommand } from '../commands/create-safra.command';
import { FindAllSafraQuery } from '../queries/find-all-safra.query';
import { FindSafraByIdQuery } from '../queries/find-safra-by-id.query';
import { UpdateSafraCommand } from '../commands/update-safra.command';
import { Safra } from '../entities/safra.entity';

/**
 * @module Safra
 * @category Controller Tests
 *
 * @description
 * Testes unitários para o `SafraController`, garantindo que os endpoints
 * acionam corretamente os comandos e queries via CQRS (CommandBus e QueryBus).
 *
 * As dependências são mockadas para isolar o controller.
 */
describe('SafraController', () => {
  let controller: SafraController;
  let commandBus: { execute: jest.Mock };
  let queryBus: { execute: jest.Mock };

  beforeEach(async () => {
    commandBus = { execute: jest.fn() };
    queryBus = { execute: jest.fn() };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [SafraController],
      providers: [
        { provide: CommandBus, useValue: commandBus },
        { provide: QueryBus, useValue: queryBus },
      ],
    }).compile();

    controller = module.get<SafraController>(SafraController);
  });

  it('deve criar uma safra', async () => {
    const dto: CreateSafraDto = {
      nome: 'Safra 2023/2024',
      culturaId: 'uuid-cultura',
      inicio: '2023-09-01',
      fim: '2024-04-30',
    };

    const safraCriada: Safra = {
      id: 'uuid-safra',
      ...dto,
      inicio: new Date(dto.inicio),
      fim: new Date(dto.fim),
      criadoEm: new Date(),
      atualizadoEm: new Date(),
    };

    commandBus.execute.mockResolvedValue(safraCriada);

    const result = await controller.create(dto);

    expect(commandBus.execute).toHaveBeenCalledWith(new CreateSafraCommand(dto));
    expect(result).toEqual(safraCriada);
  });

  it('deve buscar todas as safras', async () => {
    const lista: Safra[] = [];

    queryBus.execute.mockResolvedValue(lista);

    const result = await controller.findAll();

    expect(queryBus.execute).toHaveBeenCalledWith(new FindAllSafraQuery());
    expect(result).toEqual(lista);
  });

  it('deve buscar safra por ID', async () => {
    const id = 'uuid';
    const safra: Safra = {
      id,
      nome: 'Safra 2023/2024',
      culturaId: 'uuid-cultura',
      inicio: new Date('2023-09-01'),
      fim: new Date('2024-04-30'),
      criadoEm: new Date(),
      atualizadoEm: new Date(),
    };

    queryBus.execute.mockResolvedValue(safra);

    const result = await controller.findById(id);

    expect(queryBus.execute).toHaveBeenCalledWith(new FindSafraByIdQuery(id));
    expect(result).toEqual(safra);
  });

  it('deve atualizar uma safra parcialmente', async () => {
    const id = 'uuid';
    const dto: Partial<CreateSafraDto> = {
      nome: 'Safra Atualizada',
    };

    const safraAtualizada: Safra = {
      id,
      nome: dto.nome!,
      culturaId: 'uuid-cultura',
      inicio: new Date('2023-09-01'),
      fim: new Date('2024-04-30'),
      criadoEm: new Date(),
      atualizadoEm: new Date(),
    };

    commandBus.execute.mockResolvedValue(safraAtualizada);

    const result = await controller.update(id, dto);

    expect(commandBus.execute).toHaveBeenCalledWith(new UpdateSafraCommand(id, dto));
    expect(result).toEqual(safraAtualizada);
  });
});
