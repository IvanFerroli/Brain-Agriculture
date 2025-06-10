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

  create(data: CreateProdutorDto): Produtor {
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

  findAll(): Produtor[] {
    return this.produtores;
  }

  findById(id: string): Produtor | undefined {
    return this.produtores.find(p => p.id === id);
  }
}
