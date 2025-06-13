import {
  BadRequestException,
  ConflictException,
  Injectable,
} from "@nestjs/common";
import { CreateCulturaDto } from "../dto/create-cultura.dto";
import { Cultura } from "../entities/cultura.entity";
import { CulturaRepository } from "../repositories/cultura.repository";
import { DashboardFilterDto } from "@/modules/dashboard/dto/dashboard-filter.dto";

/**
 * @module Cultura
 * @category Service
 *
 * @description
 * Service responsável pelas regras de negócio das culturas.
 * Aplica validações antes de delegar a persistência ao `CulturaRepository`.
 */
@Injectable()
export class CulturaService {
  /**
   * Injeta o repositório de culturas que implementa o contrato `CulturaRepository`.
   *
   * @param culturaRepository Implementação concreta da interface de repositório (ex: PrismaCulturaRepository)
   */
  constructor(private readonly culturaRepository: CulturaRepository) {}

  /**
   * Cria uma nova cultura, garantindo que o nome seja único dentro da mesma safra.
   *
   * @param dto Objeto com nome, safraId e fazendaId da cultura
   * @returns A cultura criada, com ID e timestamps
   *
   * @throws {ConflictException} Se já existir cultura com mesmo nome na mesma safra
   */
  async create(dto: CreateCulturaDto): Promise<Cultura> {
    const culturas = await this.culturaRepository.findAll();

    const existe = culturas.some(
      (c: Cultura) =>
        c?.nome?.trim().toLowerCase() === dto.nome.trim().toLowerCase() &&
        c?.safraId === dto.safraId,
    );

    if (existe) {
      throw new ConflictException("Cultura já cadastrada para essa safra");
    }

    return this.culturaRepository.create(dto);
  }

  /**
   * Retorna todas as culturas cadastradas.
   *
   * @returns Lista de culturas
   */
  async findAll(): Promise<Cultura[]> {
    return this.culturaRepository.findAll();
  }

  /**
   * Busca uma cultura pelo ID.
   *
   * @param id UUID da cultura
   * @returns A cultura correspondente, ou `undefined` se não existir
   */
  async findById(id: string): Promise<Cultura | undefined> {
    return this.culturaRepository.findById(id);
  }

  /**
   * Atualiza parcialmente os dados de uma cultura existente.
   *
   * @param id ID da cultura a ser atualizada
   * @param data Dados parciais a serem atualizados
   * @returns A cultura atualizada
   */
  async update(id: string, data: Partial<CreateCulturaDto>): Promise<Cultura> {
    return this.culturaRepository.update(id, data);
  }

  /**
   * Remove uma cultura pelo ID.
   *
   * @param id UUID da cultura a ser removida
   *
   * @throws {BadRequestException} Se a cultura não for encontrada
   */
  async delete(id: string): Promise<void> {
    const culturas = await this.culturaRepository.findAll();
    const index = culturas.findIndex((c: Cultura) => c.id === id);

    if (index === -1) {
      throw new BadRequestException("Cultura não encontrada");
    }

    culturas.splice(index, 1);
  }

  /**
   * Agrupa as culturas cadastradas por nome e retorna a quantidade de ocorrências.
   *
   * @returns Objeto com nomes das culturas como chave e contagem como valor
   */
  async groupByCultura(
    filters: DashboardFilterDto,
  ): Promise<Record<string, number>> {
    return this.culturaRepository.groupByCultura(filters);
  }
}
