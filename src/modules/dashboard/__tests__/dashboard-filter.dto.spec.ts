import { DashboardFilterDto } from '../dto/dashboard-filter.dto';
import { validate } from 'class-validator';

/**
 * @module Dashboard
 * @category DTO Tests
 *
 * @description
 * Testes unitários para o `DashboardFilterDto`, responsável por validar os filtros
 * opcionais usados no endpoint `/dashboard`.
 *
 * Este DTO permite aplicar filtros como estado, cultura e limites de área mínima/máxima.
 * Todos os campos são opcionais, mas devem respeitar os tipos definidos.
 */
describe('DashboardFilterDto', () => {
  it('deve validar DTO vazio (todos os campos opcionais)', async () => {
    const dto = new DashboardFilterDto();
    const errors = await validate(dto);
    expect(errors.length).toBe(0);
  });

  it('deve aceitar valores válidos nos campos', async () => {
    const dto = new DashboardFilterDto();
    dto.estado = 'SP';
    dto.areaMin = 100;
    dto.areaMax = 500;
    dto.cultura = 'Soja';

    const errors = await validate(dto);
    expect(errors.length).toBe(0);
  });

  it('deve rejeitar areaMin como string inválida', async () => {
    const dto = new DashboardFilterDto();
    // @ts-expect-error: atribuição propositalmente inválida para teste
    dto.areaMin = 'cem';

    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].property).toBe('areaMin');
  });

  it('deve rejeitar estado como número', async () => {
    const dto = new DashboardFilterDto();
    // @ts-expect-error: atribuição propositalmente inválida para teste
    dto.estado = 42;

    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].property).toBe('estado');
  });

  it('deve rejeitar cultura como número', async () => {
    const dto = new DashboardFilterDto();
    // @ts-expect-error
    dto.cultura = 123;

    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].property).toBe('cultura');
  });
});
