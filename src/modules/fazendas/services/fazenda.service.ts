import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateFazendaDto } from "../dto/create-fazenda.dto";
import { Fazenda } from "../entities/fazenda.entity";
import { FazendaRepository } from "../repositories/fazenda.repository";
import { DashboardFilterDto } from "@/modules/dashboard/dto/dashboard-filter.dto";

/**
 * @module Fazenda
 * @category Service
 *
 * @description
 * Service responsável pelas regras de negócio relacionadas à entidade Fazenda.
 * Consome um repositório desacoplado por contrato (`FazendaRepository`), permitindo
 * troca de infraestrutura sem impacto na lógica de negócio.
 */
@Injectable()
export class FazendaService {
  /**
   * Injeta o repositório de fazendas.
   *
   * @param fazendaRepository Implementação concreta da interface `FazendaRepository`
   */
  constructor(private readonly fazendaRepository: FazendaRepository) {}

  /**
   * Cria uma nova fazenda com base nos dados validados.
   *
   * A validação da soma das áreas já foi feita no DTO.
   * Esta função apenas repassa os dados ao repositório.
   *
   * @param dto Objeto contendo nome, áreas e produtorId
   */
  async create(dto: CreateFazendaDto): Promise<Fazenda> {
    return this.fazendaRepository.create(dto);
  }

  /**
   * Retorna todas as fazendas cadastradas.
   *
   * @returns Lista de fazendas
   */
  async findAll(): Promise<Fazenda[]> {
    return await this.fazendaRepository.findAll();
  }

  /**
   * Busca uma fazenda pelo seu ID.
   *
   * @param id UUID da fazenda
   * @returns Fazenda correspondente ou `undefined`
   */
  async findById(id: string): Promise<Fazenda | undefined> {
    return await this.fazendaRepository.findById(id);
  }

  /**
   * Atualiza parcialmente os dados de uma fazenda existente.
   *
   * @param id ID da fazenda a ser atualizada
   * @param data Dados parciais (nome, áreas, etc)
   */
  async update(id: string, data: Partial<CreateFazendaDto>): Promise<void> {
    await this.fazendaRepository.update(id, data);
  }

  /**
   * Remove uma fazenda pelo ID.
   *
   * @param id UUID da fazenda a ser removida
   * @throws NotFoundException se a fazenda não for encontrada
   */
  async delete(id: string): Promise<void> {
    return this.fazendaRepository.delete(id);
  }

  /**
   * Retorna a quantidade total de fazendas que obedecem aos filtros opcionais.
   *
   * @param filters Filtros como estado, área mínima/máxima e termos de busca
   * @returns Número total de fazendas encontradas
   */
  async countByFilters(filters: DashboardFilterDto): Promise<number> {
    return this.fazendaRepository.countByFilters(filters);
  }

  /**
   * Retorna a soma da área total das fazendas que obedecem aos filtros opcionais.
   *
   * @param filters Filtros como estado, área mínima/máxima e termo de busca
   * @returns Soma da área total em hectares
   */
  async sumAreaTotalByFilters(filters: DashboardFilterDto): Promise<number> {
    return this.fazendaRepository.sumAreaTotalByFilters(filters);
  }

  /**
   * Agrupa as fazendas por estado e retorna a contagem de registros em cada um.
   *
   * @param filters Filtros opcionais a serem aplicados antes do agrupamento
   * @returns Objeto com a contagem de fazendas por estado
   */
  async groupByEstado(
    filters: DashboardFilterDto,
  ): Promise<Record<string, number>> {
    return this.fazendaRepository.groupByEstado(filters);
  }

  /**
   * Retorna a soma total das áreas agricultáveis e de vegetação das fazendas filtradas.
   *
   * @param filters Filtros como estado, área mínima/máxima e termo de busca
   * @returns Objeto com totais das áreas agricultáveis e vegetação
   */
  async sumUsoDoSoloByFilters(
    filters: DashboardFilterDto,
  ): Promise<{ areaAgricultavel: number; areaVegetacao: number }> {
    return this.fazendaRepository.sumUsoDoSoloByFilters(filters);
  }
}
