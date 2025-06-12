import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { FindAllCulturaQuery } from './find-all-cultura.query';
import { CulturaService } from '../services/cultura.service';
import { Cultura } from '../entities/cultura.entity';

/**
 * @module Cultura
 * @category Query Handler
 *
 * @description
 * Handler responsável por executar a consulta de todas as culturas.
 * Ele recebe a `FindAllCulturaQuery` e retorna a lista de culturas
 * cadastradas através do `CulturaService`.
 */
@QueryHandler(FindAllCulturaQuery)
export class FindAllCulturaHandler implements IQueryHandler<FindAllCulturaQuery> {
  constructor(private readonly culturaService: CulturaService) {}

  /**
   * Executa a consulta de todas as culturas.
   *
   * @param _query Instância da query (sem parâmetros neste caso)
   * @returns Lista de culturas cadastradas
   */
  async execute(_query: FindAllCulturaQuery): Promise<Cultura[]> {
    return this.culturaService.findAll();
  }
}
