import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateSafraDto } from "../dto/create-safra.dto";
import { Safra } from "../entities/safra.entity";
import { SafraRepository } from "../repositories/safra.repository";

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
  constructor(private readonly safraRepository: SafraRepository) {}

  /**
   * Cria uma nova safra chamando o repositório correspondente.
   *
   * @param dto Objeto com nome e período da safra
   * @returns A safra criada, com ID e timestamps
   */
  async create(dto: CreateSafraDto): Promise<Safra> {
    return this.safraRepository.create(dto);
  }

  /**
   * Retorna todas as safras cadastradas.
   *
   * @returns Lista de safras
   */
  async findAll(): Promise<Safra[]> {
    return this.safraRepository.findAll();
  }

  /**
   * Busca uma safra pelo ID.
   *
   * @param id UUID da safra
   * @returns A safra correspondente
   * @throws NotFoundException se a safra não for encontrada
   */
  async findById(id: string): Promise<Safra> {
    const safra = await this.safraRepository.findById(id);
    if (!safra) {
      throw new NotFoundException("Safra não encontrada");
    }
    return safra;
  }

  /**
   * Atualiza parcialmente os dados de uma safra existente.
   *
   * @param id ID da safra a ser atualizada
   * @param data Dados parciais a serem atualizados
   * @returns A safra atualizada
   */
  async update(id: string, data: Partial<CreateSafraDto>): Promise<Safra> {
    return this.safraRepository.update(id, data);
  }

    /**
   * Remove uma safra pelo ID.
   *
   * @param id UUID da safra a ser removida
   * @throws NotFoundException se a safra não existir
   */
  async delete(id: string): Promise<void> {
    return this.safraRepository.deleteById(id);
  }
}
