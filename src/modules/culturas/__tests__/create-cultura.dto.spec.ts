import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { CreateCulturaDto } from '../dto/create-cultura.dto';

/**
 * @module Cultura
 * @category DTO Tests
 *
 * @description
 * Testes unitários para a classe `CreateCulturaDto`, responsável por validar os dados
 * de entrada ao criar uma nova cultura.
 *
 * Esta suíte valida os campos:
 * - `nome`: obrigatório, string
 * - `safraId`: obrigatório, string (UUID da safra relacionada)
 *
 * Os testes garantem que:
 * - Valores válidos são aceitos
 * - Ausência de campos obrigatórios gera erro
 */
describe('CreateCulturaDto - Validação', () => {
  it('deve aceitar um DTO válido', async () => {
    const dto = plainToInstance(CreateCulturaDto, {
      nome: 'Milho',
      safraId: 'a1b2c3d4-5678-9101-1121-314151617181',
    });

    const errors = await validate(dto);
    expect(errors).toHaveLength(0);
  });

  it('deve rejeitar quando o nome está vazio', async () => {
    const dto = plainToInstance(CreateCulturaDto, {
      nome: '',
      safraId: 'a1b2c3d4-5678-9101-1121-314151617181',
    });

    const errors = await validate(dto);
    expect(errors).not.toHaveLength(0);
    expect(errors[0].property).toBe('nome');
  });

  it('deve rejeitar quando o safraId está vazio', async () => {
    const dto = plainToInstance(CreateCulturaDto, {
      nome: 'Soja',
      safraId: '',
    });

    const errors = await validate(dto);
    expect(errors).not.toHaveLength(0);
    expect(errors[0].property).toBe('safraId');
  });

  it('deve rejeitar DTO totalmente vazio', async () => {
    const dto = plainToInstance(CreateCulturaDto, {});

    const errors = await validate(dto);
    const props = errors.map(e => e.property);

    expect(props).toContain('nome');
    expect(props).toContain('safraId');
  });
});
