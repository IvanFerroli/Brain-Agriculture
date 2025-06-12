import { SafraRepository } from './safra.repository';
import { Safra } from '../entities/safra.entity';
import { CreateSafraDto } from '../dto/create-safra.dto';
import { v4 as uuid } from 'uuid';

/**
 * Implementação em memória do repositório de safras.
 *
 * Esta versão simula operações de banco de dados usando um array local,
 * ideal para testes iniciais ou ambientes sem persistência real.
 */
export class InMemorySafraRepository implements SafraRepository {
  private safras: Safra[] = [];

  create(data: CreateSafraDto): Safra {
    const nova: Safra = {
      id: uuid(),
      nome: data.nome,
      culturaId: data.culturaId,
      inicio: data.inicio,
      fim: data.fim,
      criadoEm: new Date(),
      atualizadoEm: new Date(),
    };

    this.safras.push(nova);
    return nova;
  }

  findAll(): Safra[] {
    return this.safras;
  }

  findById(id: string): Safra | undefined {
    return this.safras.find(s => s.id === id);
  }

  /**
   * Atualiza parcialmente os dados de uma safra.
   *
   * @param id ID da safra a ser atualizada
   * @param data Campos que devem ser atualizados
   * @returns A safra atualizada
   */
  update(id: string, data: Partial<CreateSafraDto>): Safra {
    const safra = this.findById(id);
    if (!safra) {
      throw new Error('Safra não encontrada');
    }

    Object.assign(safra, data, { atualizadoEm: new Date() });
    return safra;
  }
}
