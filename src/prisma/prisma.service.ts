import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

/**
 * Serviço responsável por encapsular o Prisma Client e integrá-lo ao ciclo de vida do NestJS.
 *
 * Essa classe é automaticamente injetada onde necessário, permitindo acesso aos métodos de banco
 * através do Prisma com gerenciamento adequado de conexão.
 *
 * Estende o `PrismaClient` gerado automaticamente e implementa os hooks `OnModuleInit` e `OnModuleDestroy`
 * para conectar e desconectar o banco nos momentos apropriados.
 */
@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  /**
   * Hook chamado automaticamente pelo NestJS quando o módulo for inicializado.
   * Estabelece a conexão com o banco de dados.
   */
  async onModuleInit() {
    await this.$connect();
  }

  /**
   * Hook chamado automaticamente pelo NestJS quando o módulo for destruído.
   * Fecha a conexão com o banco de dados para liberar recursos.
   */
  async onModuleDestroy() {
    await this.$disconnect();
  }
}
