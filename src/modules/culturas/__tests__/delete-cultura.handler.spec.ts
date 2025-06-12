import { DeleteCulturaHandler } from '../commands/delete-cultura.handler';
import { DeleteCulturaCommand } from '../commands/delete-cultura.command';
import { CulturaService } from '../services/cultura.service';

/**
 * @module Cultura
 * @category Handler Tests
 *
 * @description
 * Testes unitários para o `DeleteCulturaHandler`, responsável por executar a lógica
 * de exclusão de culturas via comando.
 *
 * A suíte valida:
 * - Que o comando de exclusão é delegado corretamente ao `CulturaService`.
 * - Que exceções são propagadas corretamente (ex: ID inexistente).
 */
describe('DeleteCulturaHandler', () => {
  let handler: DeleteCulturaHandler;
  let service: { delete: jest.Mock<Promise<void>, [string]> };

  beforeEach(() => {
    service = {
      delete: jest.fn<Promise<void>, [string]>(),
    };

    handler = new DeleteCulturaHandler(service as unknown as CulturaService);
  });

  it('deve excluir uma cultura com ID válido', async () => {
    const id = 'uuid-cultura';

    service.delete.mockResolvedValue();

    const command = new DeleteCulturaCommand(id);
    await handler.execute(command);

    expect(service.delete).toHaveBeenCalledWith(id);
  });

  it('deve lançar erro se o ID não existir', async () => {
    const id = 'id-invalido';

    service.delete.mockImplementation(() => {
      throw new Error('Cultura não encontrada');
    });

    const command = new DeleteCulturaCommand(id);

    await expect(handler.execute(command)).rejects.toThrow('Cultura não encontrada');
    expect(service.delete).toHaveBeenCalledWith(id);
  });
});
