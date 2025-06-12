import { FindSafraByIdHandler } from '../queries/find-safra-by-id.handler';
import { FindSafraByIdQuery } from '../queries/find-safra-by-id.query';
import { SafraService } from '../services/safra.service';
import { Safra } from '../entities/safra.entity';

/**
 * @module Safra
 * @category Query Handler Tests
 *
 * @description
 * Testes unitários para o `FindSafraByIdHandler`, responsável por buscar
 * safras por ID via QueryBus.
 *
 * Esta suíte valida:
 * - Que o ID é corretamente repassado ao serviço
 * - Que o retorno é propagado (safra encontrada ou `undefined`)
 * - Que exceções são lançadas corretamente
 */
describe('FindSafraByIdHandler', () => {
  let handler: FindSafraByIdHandler;
  let service: { findById: jest.Mock<Promise<Safra | undefined>, [string]> };

  beforeEach(() => {
    service = {
      findById: jest.fn<Promise<Safra | undefined>, [string]>(),
    };

    handler = new FindSafraByIdHandler(service as unknown as SafraService);
  });

  it('deve retornar uma safra com ID válido', async () => {
    const id = 'uuid-safra';

    const safra: Safra = {
      id,
      nome: 'Safra 2023/2024',
      culturaId: 'cultura-uuid',
      inicio: new Date('2023-09-01'),
      fim: new Date('2024-04-30'),
      criadoEm: new Date(),
      atualizadoEm: new Date(),
    };

    service.findById.mockResolvedValue(safra);

    const query = new FindSafraByIdQuery(id);
    const result = await handler.execute(query);

    expect(service.findById).toHaveBeenCalledWith(id);
    expect(result).toEqual(safra);
  });

  it('deve retornar undefined se a safra não existir', async () => {
    const id = 'inexistente';

    service.findById.mockResolvedValue(undefined);

    const query = new FindSafraByIdQuery(id);
    const result = await handler.execute(query);

    expect(service.findById).toHaveBeenCalledWith(id);
    expect(result).toBeUndefined();
  });

  it('deve propagar exceção lançada pelo service', async () => {
    const id = 'uuid-problema';

    service.findById.mockImplementation(() => {
      throw new Error('Erro interno');
    });

    const query = new FindSafraByIdQuery(id);
    await expect(handler.execute(query)).rejects.toThrow('Erro interno');
    expect(service.findById).toHaveBeenCalledWith(id);
  });
});
