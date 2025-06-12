import { FindAllProdutoresHandler } from '../queries/find-all-produtores.handler';
import { FindAllProdutoresQuery } from '../queries/find-all-produtores.query';
import { ProdutorService } from '../services/produtor.service';
import { Produtor } from '../entities/produtor.entity';

/**
 * @module Produtor
 * @category Query Handler Tests
 *
 * @description
 * Testes unitários para o `FindAllProdutoresHandler`, responsável por executar
 * a consulta de todos os produtores cadastrados.
 *
 * Esta suíte valida:
 * - Que a chamada é corretamente delegada ao `ProdutorService.findAll()`.
 * - Que o retorno da lista é propagado corretamente.
 */
describe('FindAllProdutoresHandler', () => {
  let handler: FindAllProdutoresHandler;
  let service: { findAll: jest.Mock<Promise<Produtor[]>, []> };

  beforeEach(() => {
    service = {
      findAll: jest.fn<Promise<Produtor[]>, []>(),
    };

    handler = new FindAllProdutoresHandler(service as unknown as ProdutorService);
  });

  it('deve retornar todos os produtores cadastrados', async () => {
    const lista: Produtor[] = [
      {
        id: '1',
        nome: 'Maria',
        documento: '12345678900',
        criadoEm: new Date(),
        atualizadoEm: new Date(),
      },
      {
        id: '2',
        nome: 'João',
        documento: '98765432100',
        criadoEm: new Date(),
        atualizadoEm: new Date(),
      },
    ];

    service.findAll.mockResolvedValue(lista);

    const result = await handler.execute(new FindAllProdutoresQuery());

    expect(service.findAll).toHaveBeenCalled();
    expect(result).toEqual(lista);
  });
});
