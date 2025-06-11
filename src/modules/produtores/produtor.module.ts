import { Module } from '@nestjs/common';

import { ProdutorController } from './controllers/produtor.controller';
import { ProdutorService } from './services/produtor.service';

import { ProdutorRepository } from './repositories/produtor.repository';
import { InMemoryProdutorRepository } from './repositories/in-memory-produtor.repository';

/**
 * Módulo responsável por encapsular toda a lógica relacionada ao domínio de produtores.
 *
 * Este módulo agrupa o controller, o service e a implementação de repositório utilizada.
 * Atualmente, utiliza uma versão em memória (`InMemoryProdutorRepository`), mas pode ser
 * facilmente substituída por uma persistência real (ex: Prisma) sem alterar as demais camadas.
 */
@Module({
  controllers: [ProdutorController],
  providers: [
    ProdutorService,

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
