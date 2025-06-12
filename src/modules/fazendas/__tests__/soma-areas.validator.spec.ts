import { SomaAreasValidator } from '../validators/soma-areas.validator';

/**
 * @module Fazenda
 * @category Validator Tests
 *
 * @description
 * Testes unitários para o validador `SomaAreasValidator`, responsável por garantir
 * que a soma das áreas agricultável e de vegetação não excede a área total da fazenda.
 *
 * Essa regra de negócio é aplicada no DTO de criação de fazenda via `@Validate()`.
 * 
 * Os testes abaixo verificam comportamentos esperados com:
 * - Entradas válidas
 * - Soma excedente
 * - Campos com valores inválidos
 *
 * @see SomaAreasValidator
 */
describe('SomaAreasValidator - Regra de soma das áreas', () => {
  let validator: SomaAreasValidator;

  beforeEach(() => {
    validator = new SomaAreasValidator();
  });

  it('deve validar quando a soma das áreas é menor que a área total', () => {
    const dto = {
      areaTotal: 100,
      areaAgricultavel: 40,
      areaVegetacao: 30,
    };

    const result = validator.validate(dto);
    expect(result).toBe(true);
  });

  it('deve validar quando a soma das áreas é igual à área total', () => {
    const dto = {
      areaTotal: 100,
      areaAgricultavel: 60,
      areaVegetacao: 40,
    };

    const result = validator.validate(dto);
    expect(result).toBe(true);
  });

  it('deve falhar quando a soma das áreas excede a área total', () => {
    const dto = {
      areaTotal: 100,
      areaAgricultavel: 80,
      areaVegetacao: 30, // 110 > 100
    };

    const result = validator.validate(dto);
    expect(result).toBe(false);
  });

  it('deve falhar quando algum campo não é numérico', () => {
    const dto = {
      areaTotal: 'cem',
      areaAgricultavel: 40,
      areaVegetacao: 30,
    };

    const result = validator.validate(dto);
    expect(result).toBe(false);
  });

  it('deve retornar a mensagem de erro padrão corretamente', () => {
    const msg = validator.defaultMessage({} as any);
    expect(msg).toBe('A soma das áreas agricultável e de vegetação excede a área total da fazenda');
  });
});
