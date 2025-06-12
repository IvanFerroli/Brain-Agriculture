import { FindAllSafraHandler } from '../queries/find-all-safra.handler';
import { FindAllSafraQuery } from '../queries/find-all-safra.query';
import { SafraService } from '../services/safra.service';
import { Safra } from '../entities/safra.entity';

/**
 * @module Safra
 * @category Query Handler Tests
 *
 * @description
 * Testes unitários para o `FindAllSafraHandler`, responsável por executar
 * a consulta de todas as safras cadastradas.
 *
 * Esta suíte valida:
 * - Que a chamada é corretamente delegada ao `SafraService.findAll()`.
 * - Que o retorno da lista é propagado corretamente.
 */
describe('FindAllSafraHandler', () => {
  let handler: FindAllSafraHandler;
  let service: { findAll: jest.Mock<Promise<Safra[]>, []> };

  beforeEach(() => {
    service = {
      findAll: jest.fn<Promise<Safra[]>, []>(),
    };

    handler = new FindAllSafraHandler(service as unknown as SafraService);
  });

  it('deve retornar todas as safras cadastradas', async () => {
    const lista: Safra[] = [
      {
        id: '1',
        nome: 'Safra 2021/2022',
        culturaId: 'cultura-1',
        inicio: new Date('2021-09-01'),
        fim: new Date('2022-04-30'),
        criadoEm: new Date(),
        atualizadoEm: new Date(),
      },
      {
        id: '2',
        nome: 'Safra 2022/2023',
        culturaId: 'cultura-2',
        inicio: new Date('2022-09-01'),
        fim: new Date('2023-04-30'),
        criadoEm: new Date(),
        atualizadoEm: new Date(),
      },
    ];

    service.findAll.mockResolvedValue(lista);

    const result = await handler.execute(new FindAllSafraQuery());

    expect(service.findAll).toHaveBeenCalled();
    expect(result).toEqual(lista);
  });
});
