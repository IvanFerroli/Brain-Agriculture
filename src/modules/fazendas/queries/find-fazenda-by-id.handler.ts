import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { FindFazendaByIdQuery } from './find-fazenda-by-id.query';
import { FazendaService } from '../services/fazenda.service';
import { Fazenda } from '../entities/fazenda.entity';

/**
 * Handler responsável por processar a query de busca de uma fazenda pelo ID.
 *
 * Utiliza o service para obter os dados e encapsula a lógica de leitura no padrão CQRS.
 */
@QueryHandler(FindFazendaByIdQuery)
export class FindFazendaByIdHandler implements IQueryHandler<FindFazendaByIdQuery> {
  constructor(private readonly fazendaService: FazendaService) {}

  /**
   * Executa a busca pela fazenda correspondente ao ID informado.
   * @param query Contém o ID da fazenda.
   */
  async execute(query: FindFazendaByIdQuery): Promise<Fazenda | undefined> {
    return this.fazendaService.findById(query.id);
  }
}
