import { FindFazendaByIdHandler } from '../queries/find-fazenda-by-id.handler';
import { FindFazendaByIdQuery } from '../queries/find-fazenda-by-id.query';
import { FazendaService } from '../services/fazenda.service';
import { Fazenda } from '../entities/fazenda.entity';

/**
 * @module Fazenda
 * @category Query Handler Tests
 *
 * @description
 * Testes unitários para o `FindFazendaByIdHandler`, responsável por buscar
 * fazendas por ID via QueryBus.
 *
 * Esta suíte valida:
 * - Que o ID é corretamente repassado ao serviço
 * - Que o retorno é propagado (fazenda encontrada ou `undefined`)
 * - Que exceções são lançadas corretamente
 */
describe('FindFazendaByIdHandler', () => {
  let handler: FindFazendaByIdHandler;
  let service: { findById: jest.Mock<Promise<Fazenda | undefined>, [string]> };

  beforeEach(() => {
    service = {
      findById: jest.fn<Promise<Fazenda | undefined>, [string]>(),
    };

    handler = new FindFazendaByIdHandler(service as unknown as FazendaService);
  });

  it('deve retornar uma fazenda com ID válido', async () => {
    const id = 'uuid-fazenda';

    const fazenda: Fazenda = {
      id,
      nome: 'Fazenda Norte',
      areaTotal: 120,
      areaAgricultavel: 70,
      areaVegetacao: 40,
      produtorId: 'prod-uuid',
      criadoEm: new Date(),
      atualizadoEm: new Date(),
    };

    service.findById.mockResolvedValue(fazenda);

    const query = new FindFazendaByIdQuery(id);
    const result = await handler.execute(query);

    expect(service.findById).toHaveBeenCalledWith(id);
    expect(result).toEqual(fazenda);
  });

  it('deve retornar undefined se a fazenda não existir', async () => {
    const id = 'nao-existe';

    service.findById.mockResolvedValue(undefined);

    const query = new FindFazendaByIdQuery(id);
    const result = await handler.execute(query);

    expect(service.findById).toHaveBeenCalledWith(id);
    expect(result).toBeUndefined();
  });

  it('deve propagar exceção lançada pelo service', async () => {
    const id = 'com-erro';

    service.findById.mockImplementation(() => {
      throw new Error('Erro interno');
    });

    const query = new FindFazendaByIdQuery(id);
    await expect(handler.execute(query)).rejects.toThrow('Erro interno');
    expect(service.findById).toHaveBeenCalledWith(id);
  });
});
