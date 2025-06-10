import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { PrismaModule } from './prisma/prisma.module';
import { HealthController } from './health/health.controller';
import { envSchema } from './config/env.validation';

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
     *
     * A validação é feita usando o Zod schema (`envSchema`), e impede o boot da aplicação
     * caso alguma variável obrigatória esteja ausente ou mal formatada.
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
     * Disponibiliza o `PrismaService` para toda a aplicação.
     */
    PrismaModule,
  ],

  /**
   * Controladores disponíveis na aplicação.
   * No momento, expõe apenas o endpoint de healthcheck.
   */
  controllers: [HealthController],
})
export class AppModule {}
