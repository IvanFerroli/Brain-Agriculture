import { UpdateCulturaCommand } from '../commands/update-cultura.command';
import { CreateCulturaDto } from '../dto/create-cultura.dto';

/**
 * @module Cultura
 * @category Command Tests
 *
 * @description
 * Testes unitários para o `UpdateCulturaCommand`, responsável por transportar
 * os dados necessários para atualizar uma cultura.
 *
 * A suíte valida:
 * - Que o ID e os dados parciais são armazenados corretamente.
 */
describe('UpdateCulturaCommand', () => {
  it('deve armazenar o ID e os dados de atualização corretamente', () => {
    const id = 'uuid-cultura';
    const data: Partial<CreateCulturaDto> = {
      nome: 'Cultura Atualizada',
      safraId: 'safra-2025',
    };

    const command = new UpdateCulturaCommand(id, data);

    expect(command.id).toBe(id);
    expect(command.data).toEqual(data);
  });
});
