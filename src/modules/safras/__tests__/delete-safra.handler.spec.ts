import { DeleteSafraHandler } from '../commands/delete-safra.handler';
import { DeleteSafraCommand } from '../commands/delete-safra.command';
import { SafraService } from '../services/safra.service';

/**
 * @module Safra
 * @category Handler Tests
 *
 * @description
 * Testes unitários para o `DeleteSafraHandler`, responsável por executar a lógica
 * de exclusão de safras via comando.
 *
 * A suíte valida:
 * - Que o comando de exclusão é delegado corretamente ao `SafraService`.
 * - Que exceções são propagadas corretamente (ex: ID inválido).
 */
describe('DeleteSafraHandler', () => {
  let handler: DeleteSafraHandler;
  let service: { delete: jest.Mock<Promise<void>, [string]> };

  beforeEach(() => {
    service = {
      delete: jest.fn<Promise<void>, [string]>(),
    };

    handler = new DeleteSafraHandler(service as unknown as SafraService);
  });

  it('deve excluir uma safra com ID válido', async () => {
    const id = 'uuid-safra';

    service.delete.mockResolvedValue();

    const command = new DeleteSafraCommand(id);
    await handler.execute(command);

    expect(service.delete).toHaveBeenCalledWith(id);
  });

  it('deve lançar erro se o ID não existir', async () => {
    const id = 'id-invalido';

    service.delete.mockImplementation(() => {
      throw new Error('Safra não encontrada');
    });

    const command = new DeleteSafraCommand(id);

    await expect(handler.execute(command)).rejects.toThrow('Safra não encontrada');
    expect(service.delete).toHaveBeenCalledWith(id);
  });
});
