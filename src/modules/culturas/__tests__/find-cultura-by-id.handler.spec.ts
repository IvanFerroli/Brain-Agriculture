import { FindCulturaByIdHandler } from '../queries/find-cultura-by-id.handler';
import { FindCulturaByIdQuery } from '../queries/find-cultura-by-id.query';
import { CulturaService } from '../services/cultura.service';
import { Cultura } from '../entities/cultura.entity';

/**
 * @module Cultura
 * @category Query Handler Tests
 *
 * @description
 * Testes unitários para o `FindCulturaByIdHandler`, responsável por buscar
 * culturas por ID via QueryBus.
 *
 * Esta suíte valida:
 * - Que o ID é corretamente repassado ao serviço.
 * - Que o retorno é propagado corretamente (objeto ou `undefined`).
 * - Que exceções são tratadas corretamente.
 */
describe('FindCulturaByIdHandler', () => {
  let handler: FindCulturaByIdHandler;
  let service: { findById: jest.Mock<Promise<Cultura | undefined>, [string]> };

  beforeEach(() => {
    service = {
      findById: jest.fn<Promise<Cultura | undefined>, [string]>(),
    };

    handler = new FindCulturaByIdHandler(service as unknown as CulturaService);
  });

  it('deve retornar uma cultura com ID válido', async () => {
    const id = 'uuid-cultura';

    const cultura: Cultura = {
      id,
      nome: 'Soja',
      safraId: 'safra-2024',
      criadoEm: new Date(),
      atualizadoEm: new Date(),
    };

    service.findById.mockResolvedValue(cultura);

    const query = new FindCulturaByIdQuery(id);
    const result = await handler.execute(query);

    expect(service.findById).toHaveBeenCalledWith(id);
    expect(result).toEqual(cultura);
  });

  it('deve retornar undefined se a cultura não existir', async () => {
    const id = 'inexistente';

    service.findById.mockResolvedValue(undefined);

    const query = new FindCulturaByIdQuery(id);
    const result = await handler.execute(query);

    expect(service.findById).toHaveBeenCalledWith(id);
    expect(result).toBeUndefined();
  });

  it('deve propagar exceção lançada pelo service', async () => {
    const id = 'uuid-problema';

    service.findById.mockImplementation(() => {
      throw new Error('Erro interno');
    });

    const query = new FindCulturaByIdQuery(id);
    await expect(handler.execute(query)).rejects.toThrow('Erro interno');
    expect(service.findById).toHaveBeenCalledWith(id);
  });
});
