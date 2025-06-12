import { DeleteProdutorHandler } from '../commands/delete-produtor.handler';
import { DeleteProdutorCommand } from '../commands/delete-produtor.command';
import { ProdutorService } from '../services/produtor.service';

/**
 * @module Produtor
 * @category Handler Tests
 *
 * @description
 * Testes unitários para o `DeleteProdutorHandler`, responsável por executar a lógica
 * de exclusão de produtores via comando.
 *
 * A suíte valida:
 * - Que o comando de exclusão é delegado corretamente ao `ProdutorService`.
 * - Que exceções são propagadas corretamente (ex: ID inválido).
 */
describe('DeleteProdutorHandler', () => {
  let handler: DeleteProdutorHandler;
  let service: { delete: jest.Mock<Promise<void>, [string]> };

  beforeEach(() => {
    service = {
      delete: jest.fn<Promise<void>, [string]>(),
    };

    handler = new DeleteProdutorHandler(service as unknown as ProdutorService);
  });

  it('deve excluir um produtor com ID válido', async () => {
    const id = 'uuid-produtor';

    service.delete.mockResolvedValue();

    const command = new DeleteProdutorCommand(id);
    await handler.execute(command);

    expect(service.delete).toHaveBeenCalledWith(id);
  });

  it('deve lançar erro se o ID não existir', async () => {
    const id = 'id-invalido';

    service.delete.mockImplementation(() => {
      throw new Error('Produtor não encontrado');
    });

    const command = new DeleteProdutorCommand(id);

    await expect(handler.execute(command)).rejects.toThrow('Produtor não encontrado');
    expect(service.delete).toHaveBeenCalledWith(id);
  });
});
