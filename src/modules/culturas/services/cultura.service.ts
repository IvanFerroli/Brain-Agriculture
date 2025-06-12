import { Injectable } from '@nestjs/common';
import { CreateCulturaDto } from '../dto/create-cultura.dto';
import { Cultura } from '../entities/cultura.entity';
import { CulturaRepository } from '../repositories/cultura.repository';

/**
 * Service responsável pelas regras de negócio das culturas.
 *
 * Essa classe consome um repositório que implementa a interface `CulturaRepository`,
 * permitindo trocar facilmente a infraestrutura de persistência (in-memory, banco de dados etc.)
 * sem alterar a lógica de negócio.
 */
@Injectable()
export class CulturaService {
  /**
   * Injeta o repositório de culturas que implementa o contrato `CulturaRepository`.
   *
   * @param culturaRepository Implementação concreta da interface de repositório (ex: InMemoryCulturaRepository)
   */
  constructor(
    private readonly culturaRepository: CulturaRepository,
  ) {}

  /**
   * Cria uma nova cultura chamando o repositório correspondente.
   *
   * @param dto Objeto com nome e safraId da cultura
   * @returns A cultura criada, com ID e timestamps
   */
  create(dto: CreateCulturaDto): Cultura {
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
   */
  delete(id: string): void {
    const index = this.culturaRepository.findAll().findIndex(c => c.id === id);

    if (index === -1) {
      throw new Error('Cultura não encontrada');
    }

    this.culturaRepository.findAll().splice(index, 1);
  }
}
