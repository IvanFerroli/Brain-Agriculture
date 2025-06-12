import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetDashboardMetricsQuery } from './get-dashboard-metrics.query';
import { DashboardService } from '../services/dashboard.service';

/**
 * Handler responsável por tratar a query `GetDashboardMetricsQuery`.
 *
 * Esta query recupera dados agregados para o dashboard com base nos filtros recebidos.
 * A lógica de agregação e filtragem é delegada ao `DashboardService`.
 *
 * 🚧 Obs: Os filtros podem incluir `search`, `areaMin`, `areaMax` e outros futuros.
 */
@QueryHandler(GetDashboardMetricsQuery)
export class GetDashboardMetricsHandler implements IQueryHandler<GetDashboardMetricsQuery> {
  constructor(private readonly dashboardService: DashboardService) {}

  /**
   * Executa a lógica associada à consulta de métricas do dashboard.
   *
   * @param query - Objeto `GetDashboardMetricsQuery` contendo os filtros para agregação
   * @returns Um objeto com as métricas filtradas, pronto para ser retornado ao frontend
   */
  async execute(query: GetDashboardMetricsQuery): Promise<any> {
    return this.dashboardService.getMetrics(query.filters);
  }
}
