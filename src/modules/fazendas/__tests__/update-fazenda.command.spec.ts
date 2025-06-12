import { UpdateFazendaCommand } from '../commands/update-fazenda.command';
import { CreateFazendaDto } from '../dto/create-fazenda.dto';

/**
 * @module Fazenda
 * @category Command Tests
 *
 * @description
 * Testes unitários para o `UpdateFazendaCommand`, responsável por transportar
 * os dados necessários para atualizar uma fazenda rural.
 *
 * O teste valida que os dados são corretamente atribuídos ao instanciar o comando.
 */
describe('UpdateFazendaCommand', () => {
  it('deve armazenar o ID e os dados de atualização corretamente', () => {
    const id = 'uuid-fazenda';
    const data: Partial<CreateFazendaDto> = {
      nome: 'Nova Fazenda',
      areaTotal: 150,
    };

    const command = new UpdateFazendaCommand(id, data);

    expect(command.id).toBe(id);
    expect(command.data).toEqual(data);
  });
});
