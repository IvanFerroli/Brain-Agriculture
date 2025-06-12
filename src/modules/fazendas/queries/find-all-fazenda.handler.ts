import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { FindAllFazendasQuery } from './find-all-fazenda.query';
import { FazendaService } from '../services/fazenda.service';
import { Fazenda } from '../entities/fazenda.entity';

/**
 * Handler responsável por processar a query de listagem de todas as fazendas.
 *
 * Utiliza o service para retornar todas as entidades registradas.
 */
@QueryHandler(FindAllFazendasQuery)
export class FindAllFazendasHandler implements IQueryHandler<FindAllFazendasQuery> {
  constructor(private readonly fazendaService: FazendaService) {}

  /**
   * Executa a listagem completa de fazendas.
   */
  async execute(_: FindAllFazendasQuery): Promise<Fazenda[]> {
    return this.fazendaService.findAll();
  }
}
