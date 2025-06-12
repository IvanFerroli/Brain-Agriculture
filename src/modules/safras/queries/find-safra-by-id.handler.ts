import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { FindSafraByIdQuery } from './find-safra-by-id.query';
import { SafraService } from '../services/safra.service';
import { Safra } from '../entities/safra.entity';

/**
 * Handler responsável por executar a busca de safra por ID.
 */
@QueryHandler(FindSafraByIdQuery)
export class FindSafraByIdHandler implements IQueryHandler<FindSafraByIdQuery> {
  constructor(private readonly safraService: SafraService) {}

  async execute(query: FindSafraByIdQuery): Promise<Safra | undefined> {
    return this.safraService.findById(query.id);
  }
}
