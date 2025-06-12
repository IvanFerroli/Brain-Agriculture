import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { FindProdutorByIdQuery } from './find-produtor-by-id.query';
import { ProdutorService } from '../services/produtor.service';
import { Produtor } from '../entities/produtor.entity';

/**
 * Handler responsável por executar a busca de produtor por ID.
 */
@QueryHandler(FindProdutorByIdQuery)
export class FindProdutorByIdHandler implements IQueryHandler<FindProdutorByIdQuery> {
  constructor(private readonly produtorService: ProdutorService) {}

    async execute(query: FindProdutorByIdQuery): Promise<Produtor | undefined> {
    return this.produtorService.findById(query.id);
  }

}
