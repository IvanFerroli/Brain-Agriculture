import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { PrismaModule } from './prisma/prisma.module';
import { HealthController } from './health/health.controller';
import { envSchema } from './config/env.validation';

import { ProdutorModule } from './modules/produtores/produtor.module';
import { SafraModule } from './modules/safras/safra.module';
import { CulturaModule } from './modules/culturas/cultura.module';
import { FazendaModule } from './modules/fazendas/fazenda.module';
import { DashboardModule } from './modules/dashboard/dashboard.module';

/**
 * Módulo principal da aplicação (`AppModule`).
 *
 * É responsável por registrar os módulos e controladores centrais da aplicação.
 * Aqui são carregadas configurações globais, como variáveis de ambiente e serviços compartilhados.
 */
@Module({
  imports: [
    /**
     * Módulo de configuração global, que carrega e valida as variáveis de ambiente do `.env`.
     */
    ConfigModule.forRoot({
      isGlobal: true,
      validate: (config) => {
        const parsed = envSchema.safeParse(config);
        if (!parsed.success) {
          console.error('❌ Erro na validação do .env:', parsed.error.flatten().fieldErrors);
          throw new Error('Variáveis de ambiente inválidas.');
        }
        return parsed.data;
      },
    }),

    /**
     * Módulo global de acesso ao banco de dados via Prisma.
     */
    PrismaModule,

    /**
     * Módulo de domínio responsável por produtores rurais.
     */
    ProdutorModule,

    /**
     * Módulo de domínio responsável por safras agrícolas.
     */
    SafraModule,

    /**
     * Módulo de domínio responsável por culturas agrícolas.
     */
    CulturaModule,

    /**
     * Módulo de domínio responsável por fazendas.
     */
    FazendaModule,

    /**
     * Módulo responsável pelo dashboard da aplicação.
     */
    DashboardModule,
  ],

  /**
   * Controladores disponíveis na aplicação.
   */
  controllers: [HealthController],
})
export class AppModule {}
