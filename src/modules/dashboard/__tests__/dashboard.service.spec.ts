import { DashboardService } from "../services/dashboard.service";
import { DashboardFilterDto } from "../dto/dashboard-filter.dto";

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
describe("DashboardService", () => {
  let service: DashboardService;

  // Mini seed mockado para simular o banco
  const mockFazendas = [
    { id: "1", estado: "SP", areaTotal: 200, areaAgricultavel: 120, areaVegetacao: 80, culturas: ["Soja"] },
    { id: "2", estado: "SP", areaTotal: 200, areaAgricultavel: 110, areaVegetacao: 90, culturas: ["Soja"] },
    { id: "3", estado: "MG", areaTotal: 500, areaAgricultavel: 350, areaVegetacao: 150, culturas: ["Café"] },
  ];

  const mockCulturas = [
    { id: "c1", nome: "Soja", fazendaId: "1" },
    { id: "c2", nome: "Soja", fazendaId: "2" },
    { id: "c3", nome: "Café", fazendaId: "3" },
  ];

  // Helper para filtrar fazendas conforme DashboardFilterDto
  function filtrarFazendas(filters: DashboardFilterDto) {
    return mockFazendas.filter(f => {
      if (filters.estado && f.estado !== filters.estado) return false;
      if (filters.areaMin !== undefined && f.areaTotal < filters.areaMin) return false;
      if (filters.areaMax !== undefined && f.areaTotal > filters.areaMax) return false;
      if (filters.cultura) {
        // Só entra se pelo menos uma cultura dessa fazenda bater
        const temCultura = f.culturas.some(c => c === filters.cultura);
        if (!temCultura) return false;
      }
      return true;
    });
  }

  beforeEach(() => {
    const mockFazendaService = {
      countByFilters: jest.fn(async (filters: DashboardFilterDto) => {
        return filtrarFazendas(filters).length;
      }),
      sumAreaTotalByFilters: jest.fn(async (filters: DashboardFilterDto) => {
        return filtrarFazendas(filters).reduce((acc, f) => acc + f.areaTotal, 0);
      }),
      groupByEstado: jest.fn(async (filters: DashboardFilterDto) => {
        const filtered = filtrarFazendas(filters);
        return filtered.reduce((acc, f) => {
          acc[f.estado] = (acc[f.estado] || 0) + 1;
          return acc;
        }, {} as Record<string, number>);
      }),
      sumUsoDoSoloByFilters: jest.fn(async (filters: DashboardFilterDto) => {
        const filtered = filtrarFazendas(filters);
        return {
          areaAgricultavel: filtered.reduce((acc, f) => acc + f.areaAgricultavel, 0),
          areaVegetacao: filtered.reduce((acc, f) => acc + f.areaVegetacao, 0),
        };
      }),
    };

    const mockCulturaService = {
      groupByCultura: jest.fn(async (filters: DashboardFilterDto) => {
        // Busca só culturas das fazendas filtradas
        const fazendasFiltradas = filtrarFazendas(filters).map(f => f.id);
        const culturasFiltradas = mockCulturas.filter(c =>
          fazendasFiltradas.includes(c.fazendaId)
        );
        return culturasFiltradas.reduce((acc, c) => {
          acc[c.nome] = (acc[c.nome] || 0) + 1;
          return acc;
        }, {} as Record<string, number>);
      }),
    };

    service = new DashboardService(
      mockFazendaService as any,
      mockCulturaService as any,
    );
  });

  it("deve retornar totais gerais sem filtro", async () => {
    const result = await service.getMetrics({});
    expect(result.totalFazendas).toBe(3);
    expect(result.totalHectares).toBe(900);
  });

  it("deve filtrar por estado", async () => {
    const dto: DashboardFilterDto = { estado: "SP" };
    const result = await service.getMetrics(dto);
    expect(result.totalFazendas).toBe(2);
    expect(result.totalHectares).toBe(400);
  });

  it("deve filtrar por cultura", async () => {
    const dto: DashboardFilterDto = { cultura: "Café" };
    const result = await service.getMetrics(dto);
    expect(result.totalFazendas).toBe(1);
    expect(result.totalHectares).toBe(500);
  });

  it("deve filtrar por areaMin", async () => {
    const dto: DashboardFilterDto = { areaMin: 400 };
    const result = await service.getMetrics(dto);
    expect(result.totalFazendas).toBe(1);
    expect(result.totalHectares).toBe(500);
  });

  it("deve filtrar por areaMax", async () => {
    const dto: DashboardFilterDto = { areaMax: 300 };
    const result = await service.getMetrics(dto);
    expect(result.totalFazendas).toBe(2);
    expect(result.totalHectares).toBe(400);
  });

  it("deve combinar múltiplos filtros (estado + cultura)", async () => {
    const dto: DashboardFilterDto = { estado: "SP", cultura: "Soja" };
    const result = await service.getMetrics(dto);
    expect(result.totalFazendas).toBe(2);
    expect(result.totalHectares).toBe(400);
  });

  it("deve retornar estrutura mockada de gráficos", async () => {
    const result = await service.getMetrics({});
    expect(result.graficos).toBeDefined();
    expect(result.graficos.porEstado).toHaveProperty("SP");
    expect(result.graficos.porCultura).toHaveProperty("Soja");
    expect(result.graficos.porUsoDoSolo).toHaveProperty("agricultavel");
  });
});
