import { CulturaRepository } from './cultura.repository';
import { Cultura } from '../entities/cultura.entity';
import { CreateCulturaDto } from '../dto/create-cultura.dto';
import { v4 as uuid } from 'uuid';

/**
 * Implementação em memória do repositório de culturas.
 *
 * Esta versão simula operações de banco de dados usando um array local,
 * ideal para testes iniciais ou ambientes sem persistência real.
 */
export class InMemoryCulturaRepository implements CulturaRepository {
  private culturas: Cultura[] = [];

  create(data: CreateCulturaDto): Cultura {
    const nova: Cultura = {
      id: uuid(),
      nome: data.nome,
      safraId: data.safraId,
      criadoEm: new Date(),
      atualizadoEm: new Date(),
    };

    this.culturas.push(nova);
    return nova;
  }

  findAll(): Cultura[] {
    return this.culturas;
  }

  findById(id: string): Cultura | undefined {
    return this.culturas.find(c => c.id === id);
  }

  /**
   * Atualiza parcialmente os dados de uma cultura.
   *
   * @param id ID da cultura a ser atualizada
   * @param data Campos que devem ser atualizados
   * @returns A cultura atualizada
   */
  update(id: string, data: Partial<CreateCulturaDto>): Cultura {
    const cultura = this.findById(id);
    if (!cultura) {
      throw new Error('Cultura não encontrada');
    }

    Object.assign(cultura, data, { atualizadoEm: new Date() });
    return cultura;
  }
}
