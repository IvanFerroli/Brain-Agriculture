import { FindAllCulturaHandler } from '../queries/find-all-cultura.handler';
import { FindAllCulturaQuery } from '../queries/find-all-cultura.query';
import { CulturaService } from '../services/cultura.service';
import { Cultura } from '../entities/cultura.entity';

/**
 * @module Cultura
 * @category Query Handler Tests
 *
 * @description
 * Testes unitários para o `FindAllCulturaHandler`, responsável por executar
 * a consulta de todas as culturas cadastradas.
 *
 * Esta suíte valida:
 * - Que a chamada é corretamente delegada ao `CulturaService.findAll()`.
 * - Que o retorno da lista é propagado corretamente.
 */
describe('FindAllCulturaHandler', () => {
  let handler: FindAllCulturaHandler;
  let service: { findAll: jest.Mock<Promise<Cultura[]>, []> };

  beforeEach(() => {
    service = {
      findAll: jest.fn<Promise<Cultura[]>, []>(),
    };

    handler = new FindAllCulturaHandler(service as unknown as CulturaService);
  });

  it('deve retornar todas as culturas cadastradas', async () => {
    const lista: Cultura[] = [
      {
        id: '1',
        nome: 'Soja',
        safraId: 'safra-2023',
        criadoEm: new Date(),
        atualizadoEm: new Date(),
      },
      {
        id: '2',
        nome: 'Milho',
        safraId: 'safra-2023',
        criadoEm: new Date(),
        atualizadoEm: new Date(),
      },
    ];

    service.findAll.mockResolvedValue(lista);

    const result = await handler.execute(new FindAllCulturaQuery());

    expect(service.findAll).toHaveBeenCalled();
    expect(result).toEqual(lista);
  });
});
