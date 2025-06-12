import { CreateCulturaCommand } from '../commands/create-cultura.command';
import { CreateCulturaDto } from '../dto/create-cultura.dto';

/**
 * @module Cultura
 * @category Command Tests
 *
 * @description
 * Testes unitários para o `CreateCulturaCommand`, responsável por transportar
 * os dados necessários para criar uma nova cultura agrícola.
 *
 * O teste valida que os dados são corretamente atribuídos ao instanciar o comando.
 */
describe('CreateCulturaCommand', () => {
  it('deve armazenar os dados corretamente no DTO', () => {
    const dto: CreateCulturaDto = {
      nome: 'Feijão',
      safraId: 'uuid-safra',
    };

    const command = new CreateCulturaCommand(dto);

    expect(command.dto).toEqual(dto);
  });
});
