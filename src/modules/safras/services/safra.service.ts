import { Injectable } from '@nestjs/common';
import { CreateSafraDto } from '../dto/create-safra.dto';
import { Safra } from '../entities/safra.entity';
import { SafraRepository } from '../repositories/safra.repository';

/**
 * Service responsável pelas regras de negócio das safras.
 *
 * Essa classe consome um repositório que implementa a interface `SafraRepository`,
 * permitindo trocar facilmente a infraestrutura de persistência (in-memory, banco de dados etc.)
 * sem alterar a lógica de negócio.
 */
@Injectable()
export class SafraService {
  /**
   * Injeta o repositório de safras que implementa o contrato `SafraRepository`.
   *
   * @param safraRepository Implementação concreta da interface de repositório (ex: InMemorySafraRepository)
   */
  constructor(
    private readonly safraRepository: SafraRepository,
  ) {}

  /**
   * Cria uma nova safra chamando o repositório correspondente.
   *
   * @param dto Objeto com nome e período da safra
   * @returns A safra criada, com ID e timestamps
   */
  create(dto: CreateSafraDto): Safra {
    return this.safraRepository.create(dto);
  }

  /**
   * Retorna todas as safras cadastradas.
   *
   * @returns Lista de safras
   */
  findAll(): Safra[] {
    return this.safraRepository.findAll();
  }

  /**
   * Busca uma safra pelo ID.
   *
   * @param id UUID da safra
   * @returns A safra correspondente, ou `undefined` se não existir
   */
  findById(id: string): Safra | undefined {
    return this.safraRepository.findById(id);
  }

  /**
   * Atualiza parcialmente os dados de uma safra existente.
   *
   * @param id ID da safra a ser atualizada
   * @param data Dados parciais a serem atualizados
   * @returns A safra atualizada
   */
  update(id: string, data: Partial<CreateSafraDto>): Safra {
    return this.safraRepository.update(id, data);
  }

  /**
   * Remove uma safra pelo ID.
   *
   * @param id UUID da safra a ser removida
   */
  delete(id: string): void {
    const index = this.safraRepository.findAll().findIndex(s => s.id === id);

    if (index === -1) {
      throw new Error('Safra não encontrada');
    }

    this.safraRepository.findAll().splice(index, 1);
  }
}
