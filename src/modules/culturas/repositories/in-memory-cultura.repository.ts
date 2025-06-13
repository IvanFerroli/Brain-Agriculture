import { CulturaRepository } from "./cultura.repository";
import { Cultura } from "../entities/cultura.entity";
import { CreateCulturaDto } from "../dto/create-cultura.dto";
import { v4 as uuid } from "uuid";

/**
 * Implementação em memória do repositório de culturas.
 *
 * Esta versão simula operações de banco de dados usando um array local,
 * ideal para testes iniciais ou ambientes sem persistência real.
 */
export class InMemoryCulturaRepository implements CulturaRepository {
  private culturas: Cultura[] = [];

  async create(data: CreateCulturaDto): Promise<Cultura> {
    const nova: Cultura = {
      id: uuid(),
      nome: data.nome,
      safraId: data.safraId,
      fazendaId: data.fazendaId,
      criadoEm: new Date(),
      atualizadoEm: new Date(),
    };

    this.culturas.push(nova);
    return nova;
  }

  async findAll(): Promise<Cultura[]> {
    return this.culturas;
  }

  async findById(id: string): Promise<Cultura | undefined> {
    return this.culturas.find((c) => c.id === id);
  }

  /**
   * Atualiza parcialmente os dados de uma cultura.
   *
   * @param id ID da cultura a ser atualizada
   * @param data Campos que devem ser atualizados
   * @returns A cultura atualizada
   */
  async update(id: string, data: Partial<CreateCulturaDto>): Promise<Cultura> {
    const cultura = await this.findById(id);
    if (!cultura) {
      throw new Error("Cultura não encontrada");
    }

    Object.assign(cultura, data, { atualizadoEm: new Date() });
    return cultura;
  }

  async groupByCultura(): Promise<Record<string, number>> {
    const all = await this.findAll();
    return all.reduce(
      (acc, cultura) => {
        const nome = cultura.nome ?? "indefinido";
        acc[nome] = (acc[nome] || 0) + 1;

        return acc;
      },
      {} as Record<string, number>,
    );
  }
}
