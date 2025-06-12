import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { FindFazendaByIdQuery } from './find-fazenda-by-id.query';
import { FazendaService } from '../services/fazenda.service';
import { Fazenda } from '../entities/fazenda.entity';

/**
 * @module Fazenda
 * @category Query Handler
 *
 * @description
 * Handler responsável por executar a busca de fazenda por ID.
 * Recebe a query `FindFazendaByIdQuery` e delega ao `FazendaService`.
 */
@QueryHandler(FindFazendaByIdQuery)
export class FindFazendaByIdHandler implements IQueryHandler<FindFazendaByIdQuery> {
  constructor(private readonly fazendaService: FazendaService) {}

  /**
   * Executa a consulta por ID de fazenda.
   *
   * @param query - Objeto contendo o ID da fazenda
   * @returns A fazenda encontrada ou `undefined` se não existir
   *
   * @throws NotFoundException (caso o service lance)
   */
  async execute(query: FindFazendaByIdQuery): Promise<Fazenda | undefined> {
    return this.fazendaService.findById(query.id);
  }
}
