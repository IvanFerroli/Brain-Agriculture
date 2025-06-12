import { CreateProdutorHandler } from '../commands/create-produtor.handler';
import { CreateProdutorCommand } from '../commands/create-produtor.command';
import { ProdutorService } from '../services/produtor.service';
import { Produtor } from '../entities/produtor.entity';

/**
 * @module Produtor
 * @category Handler Tests
 *
 * @description
 * Testes unitários para o `CreateProdutorHandler`, responsável por receber comandos de
 * criação de produtores rurais e delegar ao `ProdutorService` a aplicação da lógica de negócio.
 *
 * Esta suíte valida:
 * - Que o comando é corretamente repassado ao service.
 * - Que o retorno do service é propagado.
 * - Que exceções do service são propagadas corretamente.
 *
 * O `ProdutorService` é mockado com jest para garantir isolamento.
 */
describe('CreateProdutorHandler', () => {
  let handler: CreateProdutorHandler;
  let service: jest.Mocked<ProdutorService>;

  beforeEach(() => {
    service = {
      create: jest.fn(),
    } as unknown as jest.Mocked<ProdutorService>;

    handler = new CreateProdutorHandler(service);
  });

  it('deve criar um produtor com sucesso', async () => {
    const dto = {
      nome: 'Maria',
      documento: '12345678900',
    };

    const produtorCriado: Produtor = {
      id: 'uuid-mockado',
      nome: dto.nome,
      documento: dto.documento,
      criadoEm: new Date(),
      atualizadoEm: new Date(),
    };

    service.create.mockReturnValue(produtorCriado);

    const command = new CreateProdutorCommand(dto);
    const result = await handler.execute(command);

    expect(service.create).toHaveBeenCalledWith(dto);
    expect(result).toEqual(produtorCriado);
  });

  it('deve propagar erro se documento já estiver cadastrado', async () => {
    const dto = {
      nome: 'Carlos',
      documento: '12345678900',
    };

    const command = new CreateProdutorCommand(dto);

    service.create.mockImplementation(() => {
      throw new Error('Documento já cadastrado');
    });

    await expect(handler.execute(command)).rejects.toThrow('Documento já cadastrado');
    expect(service.create).toHaveBeenCalledWith(dto);
  });
});
