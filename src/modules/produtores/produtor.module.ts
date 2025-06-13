import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { ProdutorController } from './controllers/produtor.controller';
import { ProdutorService } from './services/produtor.service';

import { ProdutorRepository } from './repositories/produtor.repository';
import { PrismaProdutorRepository } from './repositories/prisma-produtor.repository';

import { commandHandlers } from './commands';
import { queryHandlers } from './queries';

import { PrismaModule } from '@/modules/prisma/prisma.module';

/**
 * Módulo responsável por encapsular toda a lógica relacionada ao domínio de produtores.
 *
 * Este módulo agrupa o controller, o service, o padrão CQRS e a implementação de repositório utilizada.
 * Atualmente, utiliza o `PrismaProdutorRepository` para persistência real em banco de dados PostgreSQL via Prisma,
 * substituindo a versão in-memory sem necessidade de alterar as demais camadas da aplicação.
 */
@Module({
  imports: [
    /**
     * Módulo responsável por fornecer o barramento de comandos e queries (CQRS).
     */
    CqrsModule,

    /**
     * Módulo global que disponibiliza o PrismaService para todos os providers.
     */
    PrismaModule,
  ],

  controllers: [ProdutorController],

  providers: [
    ProdutorService,

    /**
     * Handlers do padrão CQRS (comandos e queries).
     */
    ...commandHandlers,
    ...queryHandlers,

    /**
     * Override manual do provider para aplicar a implementação concreta da interface.
     *
     * Sempre que algum serviço requisitar `ProdutorRepository`, será injetada a classe
     * `PrismaProdutorRepository`.
     */
    {
      provide: ProdutorRepository,
      useClass: PrismaProdutorRepository,
    },
  ],
})
export class ProdutorModule {}
