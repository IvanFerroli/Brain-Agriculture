import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { ProdutorController } from './controllers/produtor.controller';
import { ProdutorService } from './services/produtor.service';

import { ProdutorRepository } from './repositories/produtor.repository';
import { InMemoryProdutorRepository } from './repositories/in-memory-produtor.repository';

import { commandHandlers } from './commands';
import { FindAllProdutoresHandler } from './queries/find-all-produtores.handler';
import { FindProdutorByIdHandler } from './queries/find-produtor-by-id.handler';

/**
 * Módulo responsável por encapsular toda a lógica relacionada ao domínio de produtores.
 *
 * Este módulo agrupa o controller, o service, o padrão CQRS e a implementação de repositório utilizada.
 * Atualmente, utiliza uma versão em memória (`InMemoryProdutorRepository`), mas pode ser
 * facilmente substituída por uma persistência real (ex: Prisma) sem alterar as demais camadas.
 */
@Module({
  imports: [
    /**
     * Módulo responsável por fornecer o barramento de comandos e queries (CQRS).
     */
    CqrsModule,
  ],

  controllers: [ProdutorController],

  providers: [
    ProdutorService,

    /**
     * Handlers do padrão CQRS (comandos e queries).
     */
    ...commandHandlers,
    FindAllProdutoresHandler,
    FindProdutorByIdHandler,

    /**
     * Override manual do provider para aplicar a implementação concreta da interface.
     *
     * Sempre que algum serviço requisitar `ProdutorRepository`, será injetada a classe
     * `InMemoryProdutorRepository`.
     */
    {
      provide: ProdutorRepository,
      useClass: InMemoryProdutorRepository,
    },
  ],
})
export class ProdutorModule {}
