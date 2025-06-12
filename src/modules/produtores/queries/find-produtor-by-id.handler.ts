import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { FindProdutorByIdQuery } from './find-produtor-by-id.query';
import { ProdutorService } from '../services/produtor.service';
import { Produtor } from '../entities/produtor.entity';

/**
 * @module Produtor
 * @category Query Handler
 *
 * @description
 * Handler responsável por executar a busca de produtor por ID.
 * Recebe a query `FindProdutorByIdQuery` e delega ao `ProdutorService`.
 */
@QueryHandler(FindProdutorByIdQuery)
export class FindProdutorByIdHandler implements IQueryHandler<FindProdutorByIdQuery> {
  constructor(private readonly produtorService: ProdutorService) {}

  /**
   * Executa a consulta por ID de produtor.
   *
   * @param query - Objeto contendo o ID do produtor
   * @returns O produtor encontrado ou `undefined` se não existir
   *
   * @throws NotFoundException (caso o service lance)
   */
  async execute(query: FindProdutorByIdQuery): Promise<Produtor | undefined> {
    return this.produtorService.findById(query.id);
  }
}
