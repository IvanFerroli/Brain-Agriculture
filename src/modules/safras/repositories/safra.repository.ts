import { CreateSafraDto } from '../dto/create-safra.dto';
import { Safra } from '../entities/safra.entity';

/**
 * Interface de contrato para repositórios de Safras.
 *
 * Essa interface define os métodos que qualquer implementação de repositório de safras
 * deve seguir — seja em memória, banco relacional ou qualquer outro backend.
 */
export abstract class SafraRepository {
  /**
   * Cria uma nova safra.
   *
   * @param data Dados de criação da safra
   * @returns A safra criada
   */
  abstract create(data: CreateSafraDto): Safra;

  /**
   * Retorna todas as safras cadastradas.
   *
   * @returns Lista de safras
   */
  abstract findAll(): Safra[];

  /**
   * Busca uma safra pelo seu ID.
   *
   * @param id UUID da safra
   * @returns A safra encontrada ou `undefined` se não existir
   */
  abstract findById(id: string): Safra | undefined;

  /**
   * Atualiza parcialmente os dados de uma safra existente.
   *
   * @param id ID da safra a ser atualizada
   * @param data Campos a serem atualizados
   * @returns A safra atualizada
   */
  abstract update(id: string, data: Partial<CreateSafraDto>): Safra;
}
