import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { FindAllCulturaQuery } from './find-all-cultura.query';
import { CulturaService } from '../services/cultura.service';
import { Cultura } from '../entities/cultura.entity';

/**
 * Handler responsável por executar a query de busca de todas as culturas.
 *
 * Recebe a query `FindAllCulturaQuery` e retorna a lista completa de culturas
 * cadastradas no sistema, utilizando a lógica de serviço (Service Layer).
 */
@QueryHandler(FindAllCulturaQuery)
export class FindAllCulturaHandler implements IQueryHandler<FindAllCulturaQuery> {
  constructor(private readonly culturaService: CulturaService) {}

  /**
   * Executa a consulta.
   *
   * @param _query Instância da query (não possui parâmetros neste caso)
   * @returns Lista de culturas cadastradas
   */
  async execute(_query: FindAllCulturaQuery): Promise<Cultura[]> {
    return this.culturaService.findAll();
  }
}
