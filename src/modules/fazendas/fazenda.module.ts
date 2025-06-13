import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { FazendaController } from './controllers/fazenda.controller';
import { FazendaService } from './services/fazenda.service';

import { FazendaRepository } from './repositories/fazenda.repository';
import { PrismaFazendaRepository } from './repositories/prisma-fazenda.repository';

import { commandHandlers } from './commands';
import { queryHandlers } from './queries';

/**
 * Módulo responsável por encapsular toda a lógica relacionada ao domínio de fazendas.
 *
 * Este módulo agrupa o controller, o service, o padrão CQRS e a implementação de repositório utilizada.
 * Atualmente, utiliza uma versão em memória (`InMemoryFazendaRepository`), mas pode ser
 * facilmente substituída por uma persistência real (ex: Prisma) sem alterar as demais camadas.
 */
@Module({
  imports: [
    /**
     * Módulo responsável por fornecer o barramento de comandos e queries (CQRS).
     */
    CqrsModule,
  ],

  controllers: [FazendaController],

  providers: [
    FazendaService,

    /**
     * Handlers do padrão CQRS (comandos e queries).
     */
    ...commandHandlers,
    ...queryHandlers,

    /**
     * Override manual do provider para aplicar a implementação concreta da interface.
     *
     * Sempre que algum serviço requisitar `FazendaRepository`, será injetada a classe
     * `InMemoryFazendaRepository`.
     */
    {
      provide: FazendaRepository,
      useClass: PrismaFazendaRepository,
    },
  ],
  exports: [FazendaService],
})
export class FazendaModule {}
