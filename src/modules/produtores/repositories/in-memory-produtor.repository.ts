import { ProdutorRepository } from './produtor.repository';
import { Produtor } from '../entities/produtor.entity';
import { CreateProdutorDto } from '../dto/create-produtor.dto';
import { v4 as uuid } from 'uuid';

/**
 * Implementação em memória do repositório de produtores.
 *
 * Esta versão simula operações de banco de dados usando um array local,
 * ideal para testes iniciais ou ambientes sem persistência real.
 */
export class InMemoryProdutorRepository implements ProdutorRepository {
  private produtores: Produtor[] = [];

  async create(data: CreateProdutorDto): Promise<Produtor> {
    const novo: Produtor = {
      id: uuid(),
      nome: data.nome,
      documento: data.documento,
      criadoEm: new Date(),
      atualizadoEm: new Date(),
    };

    this.produtores.push(novo);
    return novo;
  }

  async findAll(): Promise<Produtor[]> {
    return this.produtores;
  }

  async findById(id: string): Promise<Produtor | undefined> {
    return this.produtores.find((p: Produtor) => p.id === id);
  }

  /**
   * Atualiza parcialmente os dados de um produtor.
   *
   * @param id ID do produtor a ser atualizado
   * @param data Campos que devem ser atualizados
   * @returns O produtor atualizado
   */
  async update(id: string, data: Partial<CreateProdutorDto>): Promise<Produtor> {
    const produtor = await this.findById(id);
    if (!produtor) {
      throw new Error('Produtor não encontrado');
    }

    Object.assign(produtor, data, { atualizadoEm: new Date() });
    return produtor;
  }

    /**
   * Remove um produtor pelo ID (InMemory).
   *
   * @param id UUID do produtor a ser removido
   * @throws Error se não existir
   */
  async deleteById(id: string): Promise<void> {
    const index = this.produtores.findIndex((p) => p.id === id);
    if (index === -1) {
      throw new Error('Produtor não encontrado');
    }
    this.produtores.splice(index, 1);
  }

}
