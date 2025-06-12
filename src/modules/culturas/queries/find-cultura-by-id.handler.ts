import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { FindCulturaByIdQuery } from './find-cultura-by-id.query';
import { CulturaService } from '../services/cultura.service';
import { Cultura } from '../entities/cultura.entity';

/**
 * Handler responsável por executar a busca de cultura por ID.
 */
@QueryHandler(FindCulturaByIdQuery)
export class FindCulturaByIdHandler implements IQueryHandler<FindCulturaByIdQuery> {
  constructor(private readonly culturaService: CulturaService) {}

  async execute(query: FindCulturaByIdQuery): Promise<Cultura | undefined> {
    return this.culturaService.findById(query.id);
  }
}
