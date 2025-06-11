import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { FindAllProdutoresQuery } from './find-all-produtores.query';
import { ProdutorService } from '../services/produtor.service';
import { Produtor } from '../entities/produtor.entity';

/**
 * Handler responsável por executar a query de busca de todos os produtores.
 *
 * Recebe a query `FindAllProdutoresQuery` e retorna a lista completa de produtores
 * cadastrados no sistema, utilizando a lógica de serviço (Service Layer).
 */
@QueryHandler(FindAllProdutoresQuery)
export class FindAllProdutoresHandler implements IQueryHandler<FindAllProdutoresQuery> {
  constructor(private readonly produtorService: ProdutorService) {}

  /**
   * Executa a consulta.
   *
   * @param _query Instância da query (não possui parâmetros neste caso)
   * @returns Lista de produtores cadastrados
   */
  async execute(_query: FindAllProdutoresQuery): Promise<Produtor[]> {
    return this.produtorService.findAll();
  }
}
