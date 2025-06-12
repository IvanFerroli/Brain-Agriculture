import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { FindAllFazendasQuery } from './find-all-fazenda.query';
import { FazendaService } from '../services/fazenda.service';
import { Fazenda } from '../entities/fazenda.entity';

/**
 * @module Fazenda
 * @category Query Handler
 *
 * @description
 * Handler responsável por executar a query de listagem de todas as fazendas.
 * Utiliza o `FazendaService` para recuperar os dados cadastrados.
 */
@QueryHandler(FindAllFazendasQuery)
export class FindAllFazendasHandler implements IQueryHandler<FindAllFazendasQuery> {
  constructor(private readonly fazendaService: FazendaService) {}

  /**
   * Executa a consulta de todas as fazendas cadastradas.
   *
   * @param _query Instância da query (sem parâmetros neste caso)
   * @returns Lista de fazendas
   */
  async execute(_query: FindAllFazendasQuery): Promise<Fazenda[]> {
    return this.fazendaService.findAll();
  }
}
