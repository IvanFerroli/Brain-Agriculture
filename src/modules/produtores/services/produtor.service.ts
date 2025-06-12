import { Injectable } from "@nestjs/common";
import { CreateProdutorDto } from "../dto/create-produtor.dto";
import { Produtor } from "../entities/produtor.entity";
import { ProdutorRepository } from "../repositories/produtor.repository";

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
  constructor(private readonly produtorRepository: ProdutorRepository) {}

  /**
   * Cria um novo produtor rural, garantindo que o documento (CPF ou CNPJ) não esteja duplicado.
   *
   * Antes de persistir, o documento é normalizado para conter apenas dígitos numéricos,
   * garantindo consistência de comparação e armazenamento.
   *
   * Regras de negócio aplicadas:
   * - O documento deve ser único entre todos os produtores.
   * - A duplicidade é verificada após a normalização.
   *
   * @param dto Objeto contendo o nome e o CPF/CNPJ do produtor
   * @returns O produtor criado, com ID e timestamps
   * @throws {Error} Se já existir um produtor com o mesmo documento
   */
  create(dto: CreateProdutorDto): Produtor {
    const documentoNormalizado = dto.documento.replace(/\D/g, "");

    const produtorExistente = this.produtorRepository
      .findAll()
      .find((p) => p.documento === documentoNormalizado);

    if (produtorExistente) {
      throw new Error("Documento já cadastrado");
    }

    return this.produtorRepository.create({
      ...dto,
      documento: documentoNormalizado,
    });
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

  /**
   * Remove um produtor pelo ID.
   *
   * @param id UUID do produtor a ser removido
   */
  delete(id: string): void {
    const index = this.produtorRepository
      .findAll()
      .findIndex((p) => p.id === id);

    if (index === -1) {
      throw new Error("Produtor não encontrado");
    }

    this.produtorRepository.findAll().splice(index, 1);
  }
}
