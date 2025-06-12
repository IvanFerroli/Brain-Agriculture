import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { CreateSafraDto } from '../dto/create-safra.dto';

/**
 * @module Safra
 * @category DTO Tests
 *
 * @description
 * Testes unitários para a classe `CreateSafraDto`, responsável por validar os dados
 * de entrada ao criar uma nova safra. Esta suíte cobre os seguintes campos:
 *
 * - `nome`: obrigatório, string não vazia
 * - `culturaId`: obrigatório, UUID em formato string
 * - `inicio` e `fim`: datas obrigatórias no formato ISO 8601
 *
 * Esses testes garantem que:
 * - O DTO rejeita campos ausentes ou com tipo incorreto.
 * - Apenas entradas válidas são aceitas sem erros de validação.
 *
 * @see CreateSafraDto
 */
describe('CreateSafraDto - Validação de Campos', () => {
  it('deve aceitar todos os campos válidos', async () => {
    const dto = plainToInstance(CreateSafraDto, {
      nome: 'Safra 2023/2024',
      culturaId: '123e4567-e89b-12d3-a456-426614174000',
      inicio: '2023-09-01',
      fim: '2024-04-30',
    });

    const errors = await validate(dto);
    expect(errors).toHaveLength(0);
  });

  it('deve rejeitar campos ausentes', async () => {
    const dto = plainToInstance(CreateSafraDto, {});
    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
  });

  it('deve rejeitar data em formato inválido', async () => {
    const dto = plainToInstance(CreateSafraDto, {
      nome: 'Safra Inválida',
      culturaId: '123e4567-e89b-12d3-a456-426614174000',
      inicio: '01-09-2023',
      fim: '30-04-2024',
    });

    const errors = await validate(dto);
    expect(errors.some(e => e.property === 'inicio')).toBe(true);
    expect(errors.some(e => e.property === 'fim')).toBe(true);
  });
});
