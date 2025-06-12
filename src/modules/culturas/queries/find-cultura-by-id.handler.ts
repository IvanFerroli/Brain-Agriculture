import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { FindCulturaByIdQuery } from './find-cultura-by-id.query';
import { CulturaService } from '../services/cultura.service';
import { Cultura } from '../entities/cultura.entity';

/**
 * @module Cultura
 * @category Query Handler
 *
 * @description
 * Handler responsável por executar a busca de uma cultura por ID.
 * Ele delega ao `CulturaService` a responsabilidade de retornar a cultura,
 * caso exista, ou `undefined` se não for encontrada.
 */
@QueryHandler(FindCulturaByIdQuery)
export class FindCulturaByIdHandler implements IQueryHandler<FindCulturaByIdQuery> {
  constructor(private readonly culturaService: CulturaService) {}

  /**
   * Executa a query de busca por ID.
   *
   * @param query Objeto contendo o ID da cultura a ser buscada.
   * @returns A cultura encontrada ou `undefined`
   */
  async execute(query: FindCulturaByIdQuery): Promise<Cultura | undefined> {
    return this.culturaService.findById(query.id);
  }
}
