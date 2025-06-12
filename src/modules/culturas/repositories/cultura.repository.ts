import { CreateCulturaDto } from '../dto/create-cultura.dto';
import { Cultura } from '../entities/cultura.entity';

/**
 * Interface de contrato para repositórios de Culturas.
 *
 * Essa interface define os métodos que qualquer implementação de repositório de culturas
 * deve seguir — seja em memória, banco relacional ou qualquer outro backend.
 */
export abstract class CulturaRepository {
  /**
   * Cria uma nova cultura.
   *
   * @param data Dados de criação da cultura
   * @returns A cultura criada
   */
  abstract create(data: CreateCulturaDto): Cultura;

  /**
   * Retorna todas as culturas cadastradas.
   *
   * @returns Lista de culturas
   */
  abstract findAll(): Cultura[];

  /**
   * Busca uma cultura pelo seu ID.
   *
   * @param id UUID da cultura
   * @returns A cultura encontrada ou `undefined` se não existir
   */
  abstract findById(id: string): Cultura | undefined;

  /**
   * Atualiza parcialmente os dados de uma cultura existente.
   *
   * @param id ID da cultura a ser atualizada
   * @param data Campos a serem atualizados
   * @returns A cultura atualizada
   */
  abstract update(id: string, data: Partial<CreateCulturaDto>): Cultura;
}
