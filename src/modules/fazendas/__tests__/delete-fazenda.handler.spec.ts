import { DeleteFazendaHandler } from '../commands/delete-fazenda.handler';
import { DeleteFazendaCommand } from '../commands/delete-fazenda.command';
import { FazendaService } from '../services/fazenda.service';

/**
 * @module Fazenda
 * @category Handler Tests
 *
 * @description
 * Testes unitários para o `DeleteFazendaHandler`, responsável por executar a lógica
 * de exclusão de fazendas via comando.
 *
 * A suíte valida:
 * - Que o comando de exclusão é delegado corretamente ao `FazendaService`.
 * - Que exceções são propagadas corretamente (ex: ID inexistente).
 */
describe('DeleteFazendaHandler', () => {
  let handler: DeleteFazendaHandler;
  let service: { delete: jest.Mock<Promise<void>, [string]> };

  beforeEach(() => {
    service = {
      delete: jest.fn<Promise<void>, [string]>(),
    };

    handler = new DeleteFazendaHandler(service as unknown as FazendaService);
  });

  it('deve excluir uma fazenda com ID válido', async () => {
    const id = 'uuid-fazenda';

    service.delete.mockResolvedValue();

    const command = new DeleteFazendaCommand(id);
    await handler.execute(command);

    expect(service.delete).toHaveBeenCalledWith(id);
  });

  it('deve lançar erro se o ID não existir', async () => {
    const id = 'id-invalido';

    service.delete.mockImplementation(() => {
      throw new Error('Fazenda não encontrada');
    });

    const command = new DeleteFazendaCommand(id);

    await expect(handler.execute(command)).rejects.toThrow('Fazenda não encontrada');
    expect(service.delete).toHaveBeenCalledWith(id);
  });
});
