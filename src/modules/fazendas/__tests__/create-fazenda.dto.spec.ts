import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { CreateFazendaDto } from '../dto/create-fazenda.dto';

/**
 * @module Fazenda
 * @category DTO Tests
 *
 * @description
 * Testes unitários para a classe `CreateFazendaDto`, responsável por validar os dados
 * de entrada ao criar uma nova fazenda. Esta suíte cobre validações básicas de tipo e a
 * regra de negócio relacionada à soma das áreas.
 *
 * As regras aplicadas seguem o padrão:
 * - Todos os campos são obrigatórios
 * - As áreas devem ser numéricas e positivas
 * - A soma de `areaAgricultavel` + `areaVegetacao` deve ser menor ou igual a `areaTotal`
 *
 * Esses testes garantem que:
 * - Os dados são rejeitados quando qualquer campo está inválido
 * - A regra de soma das áreas é respeitada
 * - O DTO se comporta corretamente com dados válidos
 *
 * @see CreateFazendaDto
 */
describe('CreateFazendaDto - Validações e Regra de Soma de Áreas', () => {
  const baseData = {
    nome: 'Fazenda Teste',
    areaTotal: 100,
    areaAgricultavel: 60,
    areaVegetacao: 30,
    produtorId: 'produtor-123',
  };

  it('deve validar com sucesso quando todos os dados estão corretos', async () => {
    const dto = plainToInstance(CreateFazendaDto, baseData);
    const errors = await validate(dto);
    expect(errors).toHaveLength(0);
  });

  it('deve falhar se a soma das áreas exceder a área total', async () => {
    const dto = plainToInstance(CreateFazendaDto, {
      ...baseData,
      areaAgricultavel: 70,
      areaVegetacao: 40, // 70 + 40 = 110 > 100
    });
    const errors = await validate(dto);
    expect(errors).not.toHaveLength(0);
    const somaError = errors.find(e => e.property === 'validateSomaAreas');
    expect(somaError?.constraints).toBeDefined();
    expect(Object.values(somaError!.constraints!)[0]).toContain('excede a área total');
  });

  it('deve falhar se algum campo obrigatório estiver ausente', async () => {
    // Passar um objeto vazio para simular ausência de dados
    const dto = plainToInstance(CreateFazendaDto, {});
    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
  });

  it('deve falhar se áreas forem negativas ou zero', async () => {
    const dto = plainToInstance(CreateFazendaDto, {
      ...baseData,
      areaTotal: -10,
      areaAgricultavel: 0,
      areaVegetacao: -5,
    });
    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
  });
});
