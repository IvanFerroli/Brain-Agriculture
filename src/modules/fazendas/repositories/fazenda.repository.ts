import { Fazenda } from "../entities/fazenda.entity";

/**
 * Interface que define os contratos para acesso e manipulação de dados da entidade Fazenda.
 *
 * Essa interface permite implementar diferentes estratégias de persistência (ex: InMemory, Prisma).
 */
export abstract class FazendaRepository {
  /**
   * Cria uma nova fazenda.
   * @param fazenda Dados da fazenda a ser criada.
   * @returns Objeto da fazenda criada.
   */
  abstract create(fazenda: Fazenda): Promise<Fazenda>;

  /**
   * Atualiza uma fazenda existente.
   * @param id Identificador único da fazenda.
   * @param data Dados parciais a serem atualizados.
   */
  abstract update(id: string, data: Partial<Fazenda>): Promise<void>;

  /**
   * Remove uma fazenda pelo ID.
   * @param id Identificador único da fazenda a ser removida.
   */
  abstract delete(id: string): Promise<void>;

  /**
   * Retorna todas as fazendas cadastradas.
   */
  abstract findAll(): Promise<Fazenda[]>;

  /**
   * Busca uma fazenda específica pelo ID.
   * @param id Identificador único da fazenda.
   */
  abstract findById(id: string): Promise<Fazenda | undefined>;

  /**
   * Retorna o número total de fazendas que obedecem aos filtros recebidos.
   *
   * @param filters Objeto contendo filtros opcionais como estado, área mínima/máxima e termo de busca
   * @returns Quantidade de fazendas encontradas
   */
  abstract countByFilters(filters: any): Promise<number>;

  /**
   * Retorna a soma da área total das fazendas com base nos filtros fornecidos.
   *
   * @param filters Objeto contendo filtros opcionais como estado, área mínima/máxima e termo de busca
   * @returns Soma da área total
   */
  abstract sumAreaTotalByFilters(filters: any): Promise<number>;

  /**
   * Agrupa as fazendas por estado e retorna a contagem de registros em cada estado.
   *
   * @param filters Objeto contendo filtros opcionais
   * @returns Objeto com estado como chave e contagem como valor
   */
  abstract groupByEstado(filters: any): Promise<Record<string, number>>;

  /**
   * Retorna a soma total das áreas agricultáveis e de vegetação das fazendas filtradas.
   *
   * @param filters Objeto contendo filtros opcionais como estado, área mínima/máxima e termo de busca
   * @returns Objeto com totais das áreas agricultáveis e vegetação
   */
  abstract sumUsoDoSoloByFilters(filters: any): Promise<{
    areaAgricultavel: number;
    areaVegetacao: number;
  }>;
}
