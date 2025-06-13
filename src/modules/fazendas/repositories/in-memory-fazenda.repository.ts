import { Fazenda } from "../entities/fazenda.entity";
import { FazendaRepository } from "./fazenda.repository";

/**
 * Implementação em memória da interface FazendaRepository.
 *
 * Utilizada como repositório temporário para testes e desenvolvimento inicial.
 */
export class InMemoryFazendaRepository implements FazendaRepository {
  private fazendas: Fazenda[] = [];

  async create(fazenda: Fazenda): Promise<void> {
    this.fazendas.push({
      ...fazenda,
      criadoEm: new Date(),
      atualizadoEm: new Date(),
    });
  }

  async update(id: string, data: Partial<Fazenda>): Promise<void> {
    const index = this.fazendas.findIndex((f) => f.id === id);
    if (index === -1) throw new Error("Fazenda não encontrada");

    this.fazendas[index] = {
      ...this.fazendas[index],
      ...data,
      atualizadoEm: new Date(),
    };
  }

  async delete(id: string): Promise<void> {
    const index = this.fazendas.findIndex((f) => f.id === id);
    if (index === -1) throw new Error("Fazenda não encontrada");

    this.fazendas.splice(index, 1);
  }

  async findAll(): Promise<Fazenda[]> {
    return this.fazendas;
  }

  async findById(id: string): Promise<Fazenda | undefined> {
    return this.fazendas.find((f) => f.id === id);
  }

  async countByFilters(): Promise<number> {
    const all = await this.findAll();
    return all.length;
  }

  async sumAreaTotalByFilters(): Promise<number> {
    const all = await this.findAll();
    return all.reduce((acc, fazenda) => acc + (fazenda.areaTotal || 0), 0);
  }

  async groupByEstado(): Promise<Record<string, number>> {
    const all = await this.findAll();
    return all.reduce(
      (acc, fazenda) => {
        const estado = fazenda.estado || "N/A";
        acc[estado] = (acc[estado] || 0) + 1;
        return acc;
      },
      {} as Record<string, number>,
    );
  }

  async sumUsoDoSoloByFilters(_filters: any): Promise<{
    areaAgricultavel: number;
    areaVegetacao: number;
  }> {
    const all = await this.findAll();

    const resultado: { areaAgricultavel: number; areaVegetacao: number } = {
      areaAgricultavel: 0,
      areaVegetacao: 0,
    };

    for (const fazenda of all) {
      resultado.areaAgricultavel += fazenda.areaAgricultavel ?? 0;
      resultado.areaVegetacao += fazenda.areaVegetacao ?? 0;
    }

    return resultado;
  }
}
