import { Injectable } from '@nestjs/common';
import { CreateProdutorDto } from '../dto/create-produtor.dto';
import { Produtor } from '../entities/produtor.entity';
import { ProdutorRepository } from '../repositories/produtor.repository';

/**
 * Service responsável pelas regras de negócio dos produtores.
 *
 * Essa classe consome um repositório que implementa a interface `ProdutorRepository`,
 * permitindo trocar facilmente a infraestrutura de persistência (in-memory, banco de dados etc.)
 * sem alterar a lógica de negócio.
 */
@Injectable()
export class ProdutorService {
  /**
   * Injeta o repositório de produtores que implementa o contrato `ProdutorRepository`.
   *
   * @param produtorRepository Implementação concreta da interface de repositório (ex: InMemoryProdutorRepository)
   */
  constructor(
    private readonly produtorRepository: ProdutorRepository,
  ) {}

  /**
   * Cria um novo produtor chamando o repositório correspondente.
   *
   * @param dto Objeto com nome e documento do produtor
   * @returns O produtor criado, com ID e timestamps
   */
  create(dto: CreateProdutorDto): Produtor {
    return this.produtorRepository.create(dto);
  }

  /**
   * Retorna todos os produtores cadastrados.
   *
   * @returns Lista de produtores
   */
  findAll(): Produtor[] {
    return this.produtorRepository.findAll();
  }

  /**
   * Busca um produtor pelo ID.
   *
   * @param id UUID do produtor
   * @returns O produtor correspondente, ou `undefined` se não existir
   */
    findById(id: string): Produtor | undefined {
    return this.produtorRepository.findById(id);
  }

  /**
   * Atualiza parcialmente os dados de um produtor existente.
   *
   * @param id ID do produtor a ser atualizado
   * @param data Dados parciais a serem atualizados
   * @returns O produtor atualizado
   */
  update(id: string, data: Partial<CreateProdutorDto>): Produtor {
    return this.produtorRepository.update(id, data);
  }
}

