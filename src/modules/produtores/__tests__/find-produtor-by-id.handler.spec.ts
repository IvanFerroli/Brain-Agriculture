import { FindProdutorByIdHandler } from '../queries/find-produtor-by-id.handler';
import { FindProdutorByIdQuery } from '../queries/find-produtor-by-id.query';
import { ProdutorService } from '../services/produtor.service';
import { Produtor } from '../entities/produtor.entity';

/**
 * @module Produtor
 * @category Query Handler Tests
 *
 * @description
 * Testes unitários para o `FindProdutorByIdHandler`, responsável por buscar
 * produtores rurais por ID via QueryBus.
 *
 * Esta suíte valida:
 * - Que o ID é corretamente repassado ao serviço
 * - Que o retorno é propagado (produtor encontrado ou `undefined`)
 * - Que exceções são lançadas corretamente
 */
describe('FindProdutorByIdHandler', () => {
  let handler: FindProdutorByIdHandler;
  let service: { findById: jest.Mock<Promise<Produtor | undefined>, [string]> };

  beforeEach(() => {
    service = {
      findById: jest.fn<Promise<Produtor | undefined>, [string]>(),
    };

    handler = new FindProdutorByIdHandler(service as unknown as ProdutorService);
  });

  it('deve retornar um produtor com ID válido', async () => {
    const id = 'uuid-produtor';

    const produtor: Produtor = {
      id,
      nome: 'João',
      documento: '12345678900',
      criadoEm: new Date(),
      atualizadoEm: new Date(),
    };

    service.findById.mockResolvedValue(produtor);

    const query = new FindProdutorByIdQuery(id);
    const result = await handler.execute(query);

    expect(service.findById).toHaveBeenCalledWith(id);
    expect(result).toEqual(produtor);
  });

  it('deve retornar undefined se o produtor não existir', async () => {
    const id = 'inexistente';

    service.findById.mockResolvedValue(undefined);

    const query = new FindProdutorByIdQuery(id);
    const result = await handler.execute(query);

    expect(service.findById).toHaveBeenCalledWith(id);
    expect(result).toBeUndefined();
  });

  it('deve propagar exceção lançada pelo service', async () => {
    const id = 'uuid-problema';

    service.findById.mockImplementation(() => {
      throw new Error('Erro interno');
    });

    const query = new FindProdutorByIdQuery(id);
    await expect(handler.execute(query)).rejects.toThrow('Erro interno');
    expect(service.findById).toHaveBeenCalledWith(id);
  });
});
