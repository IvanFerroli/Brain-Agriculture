import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { SafraController } from './controllers/safra.controller';
import { SafraService } from './services/safra.service';

import { SafraRepository, InMemorySafraRepository } from './repositories';

import { commandHandlers } from './commands';
import { queryHandlers } from './queries';

/**
 * Módulo responsável por encapsular toda a lógica relacionada ao domínio de safras.
 *
 * Este módulo agrupa o controller, o service, o padrão CQRS e a implementação de repositório utilizada.
 * Atualmente, utiliza uma versão em memória (`InMemorySafraRepository`), mas pode ser
 * facilmente substituída por uma persistência real (ex: Prisma) sem alterar as demais camadas.
 */
@Module({
  imports: [
    /**
     * Módulo responsável por fornecer o barramento de comandos e queries (CQRS).
     */
    CqrsModule,
  ],

  controllers: [SafraController],

  providers: [
    SafraService,

    /**
     * Handlers do padrão CQRS (comandos e queries).
     */
    ...commandHandlers,
    ...queryHandlers,

    /**
     * Override manual do provider para aplicar a implementação concreta da interface.
     *
     * Sempre que algum serviço requisitar `SafraRepository`, será injetada a classe
     * `InMemorySafraRepository`.
     */
    {
      provide: SafraRepository,
      useClass: InMemorySafraRepository,
    },
  ],
})
export class SafraModule {}
