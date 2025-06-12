import { BadRequestException, ConflictException, Injectable } from '@nestjs/common';
import { CreateCulturaDto } from '../dto/create-cultura.dto';
import { Cultura } from '../entities/cultura.entity';
import { CulturaRepository } from '../repositories/cultura.repository';

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
   * @param culturaRepository Implementação concreta da interface de repositório (ex: InMemoryCulturaRepository)
   */
  constructor(private readonly culturaRepository: CulturaRepository) {}

  /**
   * Cria uma nova cultura, garantindo que o nome seja único dentro da mesma safra.
   *
   * @param dto Objeto com nome e safraId da cultura
   * @returns A cultura criada, com ID e timestamps
   *
   * @throws {ConflictException} Se já existir cultura com mesmo nome na mesma safra
   */
  create(dto: CreateCulturaDto): Cultura {
    const existe = this.culturaRepository.findAll().some(
      (c) =>
        c.nome.trim().toLowerCase() === dto.nome.trim().toLowerCase() &&
        c.safraId === dto.safraId,
    );

    if (existe) {
      throw new ConflictException('Cultura já cadastrada para essa safra');
    }

    return this.culturaRepository.create(dto);
  }

  /**
   * Retorna todas as culturas cadastradas.
   *
   * @returns Lista de culturas
   */
  findAll(): Cultura[] {
    return this.culturaRepository.findAll();
  }

  /**
   * Busca uma cultura pelo ID.
   *
   * @param id UUID da cultura
   * @returns A cultura correspondente, ou `undefined` se não existir
   */
  findById(id: string): Cultura | undefined {
    return this.culturaRepository.findById(id);
  }

  /**
   * Atualiza parcialmente os dados de uma cultura existente.
   *
   * @param id ID da cultura a ser atualizada
   * @param data Dados parciais a serem atualizados
   * @returns A cultura atualizada
   */
  update(id: string, data: Partial<CreateCulturaDto>): Cultura {
    return this.culturaRepository.update(id, data);
  }

  /**
   * Remove uma cultura pelo ID.
   *
   * @param id UUID da cultura a ser removida
   *
   * @throws {BadRequestException} Se a cultura não for encontrada
   */
  delete(id: string): void {
    const index = this.culturaRepository.findAll().findIndex((c) => c.id === id);

    if (index === -1) {
      throw new BadRequestException('Cultura não encontrada');
    }

    this.culturaRepository.findAll().splice(index, 1);
  }
}
