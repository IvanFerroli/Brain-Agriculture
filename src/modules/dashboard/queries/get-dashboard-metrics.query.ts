import { DashboardFilterDto } from '../dto/dashboard-filter.dto';

/**
 * Query para recuperar métricas agregadas do dashboard, aplicando os filtros informados.
 *
 * Esta query é manipulada pelo `GetDashboardMetricsHandler` e tem como objetivo
 * fornecer dados estatísticos relevantes com base nos filtros opcionais enviados via `DashboardFilterDto`.
 *
 * Exemplos de filtros:
 * - `search`: texto livre para busca
 * - `areaMin` e `areaMax`: intervalo de área total da fazenda
 */
export class GetDashboardMetricsQuery {
  /**
   * @param filters - Objeto contendo os critérios de filtragem para agregação
   */
  constructor(public readonly filters: DashboardFilterDto) {}
}
