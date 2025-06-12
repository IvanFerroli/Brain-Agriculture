import { Controller, Get, Query } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { DashboardFilterDto } from '../dto/dashboard-filter.dto';
import { GetDashboardMetricsQuery } from '../queries/get-dashboard-metrics.query';

/**
 * Controller responsável pelo acesso aos dados consolidados do dashboard.
 *
 * Este controller oferece endpoints de leitura, permitindo consultar métricas
 * e estatísticas com base em filtros enviados via query string.
 *
 * Rota base: `/dashboard`
 */
@Controller('dashboard')
export class DashboardController {
  constructor(private readonly queryBus: QueryBus) {}

  /**
   * Retorna métricas e estatísticas para o dashboard.
   *
   * Este endpoint aceita filtros opcionais por query string, como intervalo de datas,
   * culturas específicas, produtores, ou áreas mínimas/máximas.
   *
   * Exemplo de chamada:
   * `/dashboard/metrics?culturaId=xyz&areaMin=50&areaMax=200`
   *
   * @param filters Filtros opcionais aplicados à consulta
   * @returns Objeto contendo os dados consolidados para exibição no dashboard
   */
  @Get('metrics')
  async getMetrics(@Query() filters: DashboardFilterDto): Promise<any> {
    return this.queryBus.execute(new GetDashboardMetricsQuery(filters));
  }
}
