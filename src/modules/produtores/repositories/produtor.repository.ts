import { CreateProdutorDto } from '../dto/create-produtor.dto';
import { Produtor } from '../entities/produtor.entity';

/**
 * Interface de contrato para repositórios de Produtores.
 *
 * Essa interface define os métodos que qualquer implementação de repositório de produtores
 * deve seguir — seja em memória, banco relacional ou qualquer outro backend.
 */
export abstract class ProdutorRepository {
  /**
   * Cria um novo produtor.
   *
   * @param data Dados de criação do produtor
   * @returns O produtor criado
   */
  abstract create(data: CreateProdutorDto): Promise<Produtor>;

  /**
   * Retorna todos os produtores cadastrados.
   *
   * @returns Lista de produtores
   */
  abstract findAll(): Promise<Produtor[]>;

  /**
   * Busca um produtor pelo seu ID.
   *
   * @param id UUID do produtor
   * @returns O produtor encontrado ou `undefined` se não existir
   */
  abstract findById(id: string): Promise<Produtor | undefined>;

  /**
   * Atualiza parcialmente os dados de um produtor existente.
   *
   * @param id ID do produtor a ser atualizado
   * @param data Campos a serem atualizados
   * @returns O produtor atualizado
   */
  abstract update(id: string, data: Partial<CreateProdutorDto>): Promise<Produtor>;

    /**
   * Remove um produtor pelo ID.
   *
   * @param id UUID do produtor a ser removido
   * @returns Promise<void>
   *
   * @throws NotFoundException se o produtor não for encontrado
   */
  abstract deleteById(id: string): Promise<void>;

}
