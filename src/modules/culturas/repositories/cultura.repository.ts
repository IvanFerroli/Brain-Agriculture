import { CreateCulturaDto } from "../dto/create-cultura.dto";
import { Cultura } from "../entities/cultura.entity";
import { DashboardFilterDto } from "@/modules/dashboard/dto/dashboard-filter.dto";

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
  abstract create(data: CreateCulturaDto): Promise<Cultura>;

  /**
   * Retorna todas as culturas cadastradas.
   *
   * @returns Lista de culturas
   */
  abstract findAll(): Promise<Cultura[]>;

  /**
   * Busca uma cultura pelo seu ID.
   *
   * @param id UUID da cultura
   * @returns A cultura encontrada ou `undefined` se não existir
   */
  abstract findById(id: string): Promise<Cultura | undefined>;

  /**
   * Atualiza parcialmente os dados de uma cultura existente.
   *
   * @param id ID da cultura a ser atualizada
   * @param data Campos a serem atualizados
   * @returns A cultura atualizada
   */
  abstract update(
    id: string,
    data: Partial<CreateCulturaDto>,
  ): Promise<Cultura>;

  /**
   * Agrupa as culturas por nome e retorna a quantidade de ocorrências.
   *
   * @returns Objeto com nomes de culturas como chave e contagem como valor
   */
  abstract groupByCultura(filters: DashboardFilterDto): Promise<Record<string, number>>;

    /**
   * Remove uma cultura pelo ID.
   *
   * @param id UUID da cultura a ser removida
   * @throws NotFoundException se não existir
   */
  abstract deleteById(id: string): Promise<void>;

}
