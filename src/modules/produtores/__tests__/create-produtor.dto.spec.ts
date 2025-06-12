import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { CreateProdutorDto } from '../dto/create-produtor.dto';

/**
 * @module Produtor
 * @category DTO Tests
 *
 * @description
 * Testes unitários para a classe `CreateProdutorDto`, responsável por validar os dados
 * de entrada ao criar um novo produtor rural. Esta suíte cobre especificamente o campo
 * `documento`, que aceita CPF ou CNPJ com ou sem pontuação.
 *
 * As regras aplicadas seguem o padrão:
 * - O valor deve conter exatamente 11 (CPF) ou 14 (CNPJ) dígitos numéricos.
 * - Pontuações são automaticamente removidas via `@Transform`.
 * - A validação é aplicada após a transformação.
 *
 * Esses testes garantem que:
 * - A normalização de entrada está funcionando como esperado.
 * - Apenas documentos com quantidade válida de dígitos são aceitos.
 * - O DTO se comporta corretamente diante de entradas válidas e inválidas.
 *
 * @see CreateProdutorDto
 */
describe('CreateProdutorDto - Validação de CPF/CNPJ', () => {
  it('deve aceitar CPF válido com pontuação', async () => {
    const dto = plainToInstance(CreateProdutorDto, {
      nome: 'João',
      documento: '123.456.789-00',
    });

    const errors = await validate(dto);
    expect(errors).toHaveLength(0);
  });

  it('deve aceitar CNPJ válido com pontuação', async () => {
    const dto = plainToInstance(CreateProdutorDto, {
      nome: 'Empresa LTDA',
      documento: '12.345.678/0001-99',
    });

    const errors = await validate(dto);
    expect(errors).toHaveLength(0);
  });

  it('deve rejeitar documento com número de dígitos inválido', async () => {
    const dto = plainToInstance(CreateProdutorDto, {
      nome: 'Nome Qualquer',
      documento: '123',
    });

    const errors = await validate(dto);
    expect(errors).not.toHaveLength(0);
    expect(errors[0].constraints?.matches).toContain('documento deve conter');
  });

  it('deve remover pontuação automaticamente', async () => {
    const dto = plainToInstance(CreateProdutorDto, {
      nome: 'Empresa',
      documento: '123.456.789-00',
    });

    expect(dto.documento).toBe('12345678900');
  });
});
