import { DashboardService } from '../services/dashboard.service';
import { DashboardFilterDto } from '../dto/dashboard-filter.dto';

/**
 * @module Dashboard
 * @category Service Tests
 *
 * @description
 * Testes unitários para o `DashboardService`, responsável por consolidar as métricas
 * agregadas do sistema (total de fazendas, hectares, gráficos por estado, cultura, solo, etc.).
 *
 * Estes testes utilizam mocks internos para simular os dados retornados das entidades.
 */
describe('DashboardService', () => {
  let service: DashboardService;

  beforeEach(() => {
    service = new DashboardService();

    // Popula manualmente os mocks (ajuste conforme seu repositório real)
    service['fazendas'] = [
      {
        id: '1',
        nome: 'Fazenda SP',
        estado: 'SP',
        areaTotal: 300,
        areaAgricultavel: 200,
        areaVegetacao: 100,
        culturas: ['Soja', 'Milho'],
      },
      {
        id: '2',
        nome: 'Fazenda MG',
        estado: 'MG',
        areaTotal: 500,
        areaAgricultavel: 300,
        areaVegetacao: 200,
        culturas: ['Café'],
      },
      {
        id: '3',
        nome: 'Fazenda SP 2',
        estado: 'SP',
        areaTotal: 100,
        areaAgricultavel: 80,
        areaVegetacao: 20,
        culturas: ['Soja'],
      },
    ];
  });

  it('deve retornar totais gerais sem filtro', async () => {
    const result = await service.getMetrics
({});
    expect(result.totalFazendas).toBe(3);
    expect(result.totalHectares).toBe(900);
  });

  it('deve filtrar por estado', async () => {
    const dto: DashboardFilterDto = { estado: 'SP' };
    const result = await service.getMetrics
(dto);
    expect(result.totalFazendas).toBe(2);
    expect(result.totalHectares).toBe(400);
  });

  it('deve filtrar por cultura', async () => {
    const dto: DashboardFilterDto = { cultura: 'Café' };
    const result = await service.getMetrics
(dto);
    expect(result.totalFazendas).toBe(1);
    expect(result.totalHectares).toBe(500);
  });

  it('deve filtrar por areaMin', async () => {
    const dto: DashboardFilterDto = { areaMin: 400 };
    const result = await service.getMetrics
(dto);
    expect(result.totalFazendas).toBe(1);
    expect(result.totalHectares).toBe(500);
  });

  it('deve filtrar por areaMax', async () => {
    const dto: DashboardFilterDto = { areaMax: 300 };
    const result = await service.getMetrics
(dto);
    expect(result.totalFazendas).toBe(2);
    expect(result.totalHectares).toBe(400);
  });

  it('deve combinar múltiplos filtros (estado + cultura)', async () => {
    const dto: DashboardFilterDto = { estado: 'SP', cultura: 'Soja' };
    const result = await service.getMetrics
(dto);
    expect(result.totalFazendas).toBe(2);
    expect(result.totalHectares).toBe(400);
  });

  it('deve retornar estrutura mockada de gráficos', async () => {
    const result = await service.getMetrics
({});
    expect(result.graficos).toBeDefined();
    expect(result.graficos.porEstado).toHaveProperty('SP');
    expect(result.graficos.porCultura).toHaveProperty('Soja');
    expect(result.graficos.porUsoDoSolo).toHaveProperty('agricultavel');
  });
});
