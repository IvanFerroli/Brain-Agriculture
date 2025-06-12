import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { FindSafraByIdQuery } from './find-safra-by-id.query';
import { SafraService } from '../services/safra.service';
import { Safra } from '../entities/safra.entity';

/**
 * @module Safra
 * @category Query Handler
 *
 * @description
 * Handler responsável por executar a busca de safra por ID.
 * Recebe a query `FindSafraByIdQuery` e delega ao `SafraService`.
 */
@QueryHandler(FindSafraByIdQuery)
export class FindSafraByIdHandler implements IQueryHandler<FindSafraByIdQuery> {
  constructor(private readonly safraService: SafraService) {}

  /**
   * Executa a consulta por ID de safra.
   *
   * @param query - Objeto contendo o ID da safra
   * @returns A safra encontrada ou `undefined` se não existir
   *
   * @throws NotFoundException (caso o service lance)
   */
  async execute(query: FindSafraByIdQuery): Promise<Safra | undefined> {
    return this.safraService.findById(query.id);
  }
}
