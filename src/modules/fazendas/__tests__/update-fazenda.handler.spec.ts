import { UpdateFazendaHandler } from '../commands/update-fazenda.handler';
import { UpdateFazendaCommand } from '../commands/update-fazenda.command';
import { FazendaService } from '../services/fazenda.service';

/**
 * @module Fazenda
 * @category Handler Tests
 *
 * @description
 * Testes unitários para o `UpdateFazendaHandler`, responsável por tratar o comando
 * de atualização de fazendas rurais.
 *
 * Esta suíte valida:
 * - Que o comando delega corretamente para o `FazendaService`.
 * - Que erros como ID inexistente são propagados corretamente.
 *
 * O service é mockado com tipagem explícita para garantir isolamento.
 */
describe('UpdateFazendaHandler', () => {
  let handler: UpdateFazendaHandler;
  let service: { update: jest.Mock<Promise<void>, [string, any]> };

  beforeEach(() => {
    service = {
      update: jest.fn<Promise<void>, [string, any]>(),
    };

    handler = new UpdateFazendaHandler(service as unknown as FazendaService);
  });

  it('deve atualizar uma fazenda com dados válidos', async () => {
    const id = 'uuid-fazenda';
    const data = { nome: 'Atualizada' };

    service.update.mockResolvedValue(undefined);

    const command = new UpdateFazendaCommand(id, data);
    const result = await handler.execute(command);

    expect(service.update).toHaveBeenCalledWith(id, data);
    expect(result).toBeUndefined();
  });

  it('deve lançar erro se o ID não existir', async () => {
    const id = 'id-invalido';
    const data = { nome: 'Qualquer' };

    service.update.mockImplementation(() => {
      throw new Error('Fazenda não encontrada');
    });

    const command = new UpdateFazendaCommand(id, data);

    await expect(handler.execute(command)).rejects.toThrow('Fazenda não encontrada');
    expect(service.update).toHaveBeenCalledWith(id, data);
  });
});
