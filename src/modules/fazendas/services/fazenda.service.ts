import { Injectable } from '@nestjs/common';
import { CreateFazendaDto } from '../dto/create-fazenda.dto';
import { Fazenda } from '../entities/fazenda.entity';
import { FazendaRepository } from '../repositories/fazenda.repository';

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
  constructor(
    private readonly fazendaRepository: FazendaRepository,
  ) {}

  /**
   * Cria uma nova fazenda com base nos dados validados.
   *
   * A validação da soma das áreas já foi feita no DTO.
   * Esta função apenas repassa os dados ao repositório.
   *
   * @param dto Objeto contendo nome, áreas e produtorId
   */
  async create(dto: CreateFazendaDto): Promise<void> {
    await this.fazendaRepository.create(dto);
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
   * Remove uma fazenda pelo ID, se ela existir.
   *
   * @param id UUID da fazenda
   * @throws Error se a fazenda não for encontrada
   */
  async delete(id: string): Promise<void> {
    const fazendas = await this.fazendaRepository.findAll();
    const index = fazendas.findIndex((f) => f.id === id);

    if (index === -1) {
      throw new Error('Fazenda não encontrada');
    }

    fazendas.splice(index, 1);
  }
}
