import { UpdateSafraHandler } from '../commands/update-safra.handler';
import { UpdateSafraCommand } from '../commands/update-safra.command';
import { SafraService } from '../services/safra.service';

/**
 * @module Safra
 * @category Handler Tests
 *
 * @description
 * Testes unitários para o `UpdateSafraHandler`, responsável por tratar o comando
 * de atualização de safras.
 *
 * Esta suíte valida:
 * - Que o comando delega corretamente para o `SafraService`.
 * - Que erros como ID inexistente são propagados.
 *
 * O service é mockado com tipagem explícita para garantir isolamento e previsibilidade.
 */
describe('UpdateSafraHandler', () => {
  let handler: UpdateSafraHandler;
  let service: { update: jest.Mock<Promise<void>, [string, Partial<any>]> };

  beforeEach(() => {
    service = {
      update: jest.fn<Promise<void>, [string, Partial<any>]>(),
    };

    handler = new UpdateSafraHandler(service as unknown as SafraService);
  });

  it('deve atualizar uma safra com dados válidos', async () => {
    const id = 'uuid-safra';
    const data = { nome: 'Nova Safra' };

    service.update.mockResolvedValue();

    const command = new UpdateSafraCommand(id, data);
    await handler.execute(command);

    expect(service.update).toHaveBeenCalledWith(id, data);
  });

  it('deve lançar erro se o ID não existir', async () => {
    const id = 'inexistente';
    const data = { nome: 'Qualquer' };

    service.update.mockImplementation(() => {
      throw new Error('Safra não encontrada');
    });

    const command = new UpdateSafraCommand(id, data);

    await expect(handler.execute(command)).rejects.toThrow('Safra não encontrada');
    expect(service.update).toHaveBeenCalledWith(id, data);
  });
});
