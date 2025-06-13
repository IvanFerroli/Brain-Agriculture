import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

/**
 * Módulo global responsável por fornecer o `PrismaService` para toda a aplicação.
 *
 * Ao ser decorado com `@Global()`, esse módulo torna o `PrismaService` disponível automaticamente
 * para todos os outros módulos da aplicação, sem necessidade de importação manual em cada um deles.
 *
 * Isso facilita a injeção do Prisma em qualquer service, controller ou provider que precise
 * acessar o banco de dados.
 */
@Global()
@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaModule {}
