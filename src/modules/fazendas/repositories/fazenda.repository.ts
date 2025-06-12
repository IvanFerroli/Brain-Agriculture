import { Fazenda } from '../entities/fazenda.entity';

/**
 * Interface que define os contratos para acesso e manipulação de dados da entidade Fazenda.
 *
 * Essa interface permite implementar diferentes estratégias de persistência (ex: InMemory, Prisma).
 */
export abstract class FazendaRepository {
  /**
   * Cria uma nova fazenda.
   * @param fazenda Dados da fazenda a ser criada.
   */
  abstract create(fazenda: Fazenda): Promise<void>;

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
}
