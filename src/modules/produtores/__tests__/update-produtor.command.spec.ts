import { UpdateProdutorCommand } from '../commands/update-produtor.command';
import { CreateProdutorDto } from '../dto/create-produtor.dto';

/**
 * @module Produtor
 * @category Command Tests
 *
 * @description
 * Testes unitários para o `UpdateProdutorCommand`, responsável por transportar
 * os dados necessários para atualizar um produtor rural.
 *
 * O teste valida que os dados são corretamente atribuídos ao instanciar o comando.
 */
describe('UpdateProdutorCommand', () => {
  it('deve armazenar o ID e os dados de atualização corretamente', () => {
    const id = 'uuid-produtor';
    const data: Partial<CreateProdutorDto> = {
      nome: 'Atualizado',
      documento: '12345678900',
    };

    const command = new UpdateProdutorCommand(id, data);

    expect(command.id).toBe(id);
    expect(command.data).toEqual(data);
  });
});
