import { UpdateSafraCommand } from '../commands/update-safra.command';
import { CreateSafraDto } from '../dto/create-safra.dto';

/**
 * @module Safra
 * @category Command Tests
 *
 * @description
 * Testes unitários para o `UpdateSafraCommand`, responsável por transportar
 * os dados necessários para atualizar uma safra existente.
 *
 * O teste valida que os dados são corretamente atribuídos ao instanciar o comando.
 */
describe('UpdateSafraCommand', () => {
  it('deve armazenar o ID e os dados de atualização corretamente', () => {
    const id = 'uuid-safra';
    const data: Partial<CreateSafraDto> = {
      nome: 'Safra Atualizada',
      fim: '2024-06-30',
    };

    const command = new UpdateSafraCommand(id, data);

    expect(command.id).toBe(id);
    expect(command.data).toEqual(data);
  });
});
