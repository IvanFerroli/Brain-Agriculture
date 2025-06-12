import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { DashboardController } from './controllers/dashboard.controller';
import { DashboardService } from './services/dashboard.service';
import { GetDashboardMetricsHandler } from './queries/get-dashboard-metrics.handler';

/**
 * Módulo responsável pelo domínio de dashboard e métricas.
 *
 * Este módulo é responsável por expor os endpoints de leitura agregada (ex: total de produtores,
 * fazendas, safras, etc.), podendo receber filtros via query params.
 *
 * Implementado com o padrão CQRS (QueryBus).
 */
@Module({
  imports: [
    /**
     * Módulo CQRS para permitir uso de QueryBus e CommandBus.
     */
    CqrsModule,
  ],
  controllers: [
    /**
     * Controlador que expõe os endpoints públicos de dashboard.
     */
    DashboardController,
  ],
  providers: [
    /**
     * Serviço que implementa a lógica de agregação e métricas.
     */
    DashboardService,

    /**
     * Handler da query de métricas do dashboard.
     */
    GetDashboardMetricsHandler,
  ],
})
export class DashboardModule {}
