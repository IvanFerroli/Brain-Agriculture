import { UpdateCulturaHandler } from '../commands/update-cultura.handler';
import { UpdateCulturaCommand } from '../commands/update-cultura.command';
import { CulturaService } from '../services/cultura.service';
import { Cultura } from '../entities/cultura.entity';

/**
 * @module Cultura
 * @category Handler Tests
 *
 * @description
 * Testes unitários para o `UpdateCulturaHandler`, responsável por tratar o comando
 * de atualização de culturas.
 *
 * A suíte valida:
 * - Que o comando delega corretamente para o `CulturaService`.
 * - Que erros como ID inexistente ou nome duplicado são propagados.
 *
 * O service é mockado com tipagem explícita para garantir isolamento e previsibilidade.
 */
describe('UpdateCulturaHandler', () => {
  let handler: UpdateCulturaHandler;
  let service: { update: jest.Mock<Promise<Cultura>, [string, Partial<Cultura>]> };

  beforeEach(() => {
    service = {
      update: jest.fn<Promise<Cultura>, [string, Partial<Cultura>]>(),
    };

    handler = new UpdateCulturaHandler(service as unknown as CulturaService);
  });

  it('deve atualizar uma cultura com dados válidos', async () => {
    const id = 'uuid-cultura';
    const data = { nome: 'Atualizado' };

    const culturaAtualizada: Cultura = {
      id,
      nome: 'Atualizado',
      safraId: 'safra-2024',
      criadoEm: new Date(),
      atualizadoEm: new Date(),
    };

    service.update.mockResolvedValue(culturaAtualizada);

    const command = new UpdateCulturaCommand(id, data);
    const result = await handler.execute(command);

    expect(service.update).toHaveBeenCalledWith(id, data);
    expect(result).toEqual(culturaAtualizada);
  });

  it('deve lançar erro se o ID não existir', async () => {
    const id = 'inexistente';
    const data = { nome: 'Qualquer' };

    service.update.mockImplementation(() => {
      throw new Error('Cultura não encontrada');
    });

    const command = new UpdateCulturaCommand(id, data);

    await expect(handler.execute(command)).rejects.toThrow('Cultura não encontrada');
    expect(service.update).toHaveBeenCalledWith(id, data);
  });

  it('deve lançar erro se o novo nome já estiver em uso na mesma safra', async () => {
    const id = 'uuid-cultura';
    const data = { nome: 'Soja' };

    service.update.mockImplementation(() => {
      throw new Error('Cultura já cadastrada para essa safra');
    });

    const command = new UpdateCulturaCommand(id, data);

    await expect(handler.execute(command)).rejects.toThrow('Cultura já cadastrada para essa safra');
    expect(service.update).toHaveBeenCalledWith(id, data);
  });
});
