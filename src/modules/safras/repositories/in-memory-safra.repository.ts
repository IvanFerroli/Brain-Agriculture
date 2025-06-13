import { SafraRepository } from "./safra.repository";
import { Safra } from "../entities/safra.entity";
import { CreateSafraDto } from "../dto/create-safra.dto";
import { v4 as uuid } from "uuid";

/**
 * Implementação em memória do repositório de safras.
 *
 * Esta versão simula operações de banco de dados usando um array local,
 * ideal para testes iniciais ou ambientes sem persistência real.
 */
export class InMemorySafraRepository implements SafraRepository {
  private safras: Safra[] = [];

  /**
   * Cria uma nova safra.
   *
   * @param data Dados de criação da safra
   * @returns A safra criada
   */
  async create(data: CreateSafraDto): Promise<Safra> {
    const nova: Safra = {
      id: uuid(),
      nome: data.nome,
      culturaId: data.culturaId,
      inicio: new Date(data.inicio),
      fim: new Date(data.fim),
      criadoEm: new Date(),
      atualizadoEm: new Date(),
    };

    this.safras.push(nova);
    return nova;
  }

  /**
   * Retorna todas as safras cadastradas.
   *
   * @returns Lista de safras
   */
  async findAll(): Promise<Safra[]> {
    return this.safras;
  }

  /**
   * Busca uma safra pelo seu ID.
   *
   * @param id UUID da safra
   * @returns A safra encontrada ou `undefined` se não existir
   */
  async findById(id: string): Promise<Safra | undefined> {
    return this.safras.find((s) => s.id === id);
  }

  /**
   * Atualiza parcialmente os dados de uma safra.
   *
   * @param id ID da safra a ser atualizada
   * @param data Campos que devem ser atualizados
   * @returns A safra atualizada
   */
  async update(id: string, data: Partial<CreateSafraDto>): Promise<Safra> {
    const safra = await this.findById(id);
    if (!safra) {
      throw new Error("Safra não encontrada");
    }

    Object.assign(safra, data, { atualizadoEm: new Date() });
    return safra;
  }
  /**
   * Remove uma safra pelo ID (InMemory).
   *
   * @param id UUID da safra a ser removida
   * @throws Error se a safra não for encontrada
   */
  async deleteById(id: string): Promise<void> {
    const index = this.safras.findIndex((s) => s.id === id);
    if (index === -1) {
      throw new Error("Safra não encontrada");
    }
    this.safras.splice(index, 1);
  }
}
