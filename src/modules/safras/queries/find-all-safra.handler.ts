import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { FindAllSafraQuery } from './find-all-safra.query';
import { SafraService } from '../services/safra.service';
import { Safra } from '../entities/safra.entity';

/**
 * Handler responsável por executar a query de busca de todas as safras.
 *
 * Recebe a query `FindAllSafraQuery` e retorna a lista completa de safras
 * cadastradas no sistema, utilizando a lógica de serviço (Service Layer).
 */
@QueryHandler(FindAllSafraQuery)
export class FindAllSafraHandler implements IQueryHandler<FindAllSafraQuery> {
  constructor(private readonly safraService: SafraService) {}

  /**
   * Executa a consulta.
   *
   * @param _query Instância da query (não possui parâmetros neste caso)
   * @returns Lista de safras cadastradas
   */
  async execute(_query: FindAllSafraQuery): Promise<Safra[]> {
    return this.safraService.findAll();
  }
}
