import { Module } from "@nestjs/common";
import { CqrsModule } from "@nestjs/cqrs";

import { CulturaController } from "./controllers/cultura.controller";
import { CulturaService } from "./services/cultura.service";

import { CulturaRepository, InMemoryCulturaRepository } from "./repositories";

import { commandHandlers } from "./commands";
import { queryHandlers } from "./queries";

/**
 * Módulo responsável por encapsular toda a lógica relacionada ao domínio de culturas.
 *
 * Este módulo agrupa o controller, o service, o padrão CQRS e a implementação de repositório utilizada.
 * Atualmente, utiliza uma versão em memória (`InMemoryCulturaRepository`), mas pode ser
 * facilmente substituída por uma persistência real (ex: Prisma) sem alterar as demais camadas.
 */
@Module({
  imports: [
    /**
     * Módulo responsável por fornecer o barramento de comandos e queries (CQRS).
     */
    CqrsModule,
  ],

  controllers: [CulturaController],

  providers: [
    CulturaService,

    /**
     * Handlers do padrão CQRS (comandos e queries).
     */
    ...commandHandlers,
    ...queryHandlers,

    /**
     * Override manual do provider para aplicar a implementação concreta da interface.
     *
     * Sempre que algum serviço requisitar `CulturaRepository`, será injetada a classe
     * `InMemoryCulturaRepository`.
     */
    {
      provide: CulturaRepository,
      useClass: InMemoryCulturaRepository,
    },
  ],
  exports: [CulturaService],
})
export class CulturaModule {}
