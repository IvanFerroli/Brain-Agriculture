import { FindAllFazendasHandler } from '../queries/find-all-fazenda.handler';
import { FindAllFazendasQuery } from '../queries/find-all-fazenda.query';
import { FazendaService } from '../services/fazenda.service';
import { Fazenda } from '../entities/fazenda.entity';

/**
 * @module Fazenda
 * @category Query Handler Tests
 *
 * @description
 * Testes unitários para o `FindAllFazendasHandler`, responsável por executar
 * a consulta de todas as fazendas cadastradas.
 *
 * Esta suíte valida:
 * - Que a chamada é corretamente delegada ao `FazendaService.findAll()`.
 * - Que o retorno da lista é propagado corretamente.
 */
describe('FindAllFazendasHandler', () => {
  let handler: FindAllFazendasHandler;
  let service: { findAll: jest.Mock<Promise<Fazenda[]>, []> };

  beforeEach(() => {
    service = {
      findAll: jest.fn<Promise<Fazenda[]>, []>(),
    };

    handler = new FindAllFazendasHandler(service as unknown as FazendaService);
  });

  it('deve retornar todas as fazendas cadastradas', async () => {
    const lista: Fazenda[] = [
      {
        id: '1',
        nome: 'Fazenda Alpha',
        areaTotal: 100,
        areaAgricultavel: 60,
        areaVegetacao: 30,
        produtorId: 'prod-1',
        criadoEm: new Date(),
        atualizadoEm: new Date(),
      },
      {
        id: '2',
        nome: 'Fazenda Beta',
        areaTotal: 80,
        areaAgricultavel: 50,
        areaVegetacao: 25,
        produtorId: 'prod-2',
        criadoEm: new Date(),
        atualizadoEm: new Date(),
      },
    ];

    service.findAll.mockResolvedValue(lista);

    const result = await handler.execute(new FindAllFazendasQuery());

    expect(service.findAll).toHaveBeenCalled();
    expect(result).toEqual(lista);
  });
});
