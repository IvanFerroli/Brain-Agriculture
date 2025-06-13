import { Injectable } from "@nestjs/common";
import { DashboardFilterDto } from "../dto/dashboard-filter.dto";
import { FazendaService } from "@/modules/fazendas/services/fazenda.service";
import { CulturaService } from "@/modules/culturas/services/cultura.service";

/**
 * Serviço responsável por calcular e retornar as métricas do dashboard.
 *
 * Esta classe atua como a orquestradora das consultas agregadas, utilizando os filtros
 * recebidos para personalizar os dados retornados.
 *
 * A partir da Fase 4, este serviço integra diretamente com os repositórios Prisma,
 * acessando dados reais dos módulos `Fazenda` e `Cultura` para gerar as métricas do dashboard.
 */
@Injectable()
export class DashboardService {
  constructor(
    private readonly fazendaService: FazendaService,
    private readonly culturaService: CulturaService,
  ) {}

  /**
   * Retorna as métricas agregadas com base nos filtros recebidos, utilizando dados reais do banco.
   *
   * @param filters - Objeto contendo critérios opcionais para refinar os dados do dashboard
   * @returns Um objeto com as métricas do sistema e os filtros aplicados
   */
  async getMetrics(filters: DashboardFilterDto): Promise<any> {
    const totalFazendas = await this.fazendaService.countByFilters(filters);
    const totalHectares = await this.fazendaService.sumAreaTotalByFilters(filters);

    const porEstado = await this.fazendaService.groupByEstado(filters);
    const porCultura = await this.culturaService.groupByCultura(filters);
    const usoDoSolo = await this.fazendaService.sumUsoDoSoloByFilters(filters);

    const graficos = {
      porEstado,
      porCultura,
      porUsoDoSolo: {
        agricultavel: usoDoSolo.areaAgricultavel,
        vegetacao: usoDoSolo.areaVegetacao,
      },
    };

    return {
      totalFazendas,
      totalHectares,
      graficos,
      filtrosAplicados: filters,
    };
  }
}
