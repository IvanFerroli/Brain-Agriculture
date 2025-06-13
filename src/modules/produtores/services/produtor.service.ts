import { Injectable, NotFoundException } from '@nestjs/common';
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
  constructor(private readonly produtorRepository: ProdutorRepository) {}

  /**
   * Cria um novo produtor rural, garantindo que o documento (CPF ou CNPJ) não esteja duplicado.
   */
  async create(dto: CreateProdutorDto): Promise<Produtor> {
    const documentoNormalizado = dto.documento.replace(/\D/g, "");
    const produtores = await this.produtorRepository.findAll();

    const produtorExistente = produtores.find((p: Produtor) => p.documento === documentoNormalizado);

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
   */
  async findAll(): Promise<Produtor[]> {
    return this.produtorRepository.findAll();
  }

  /**
   * Busca um produtor pelo ID.
   */
  async findById(id: string): Promise<Produtor> {
    const produtor = await this.produtorRepository.findById(id);
    if (!produtor) {
      throw new NotFoundException('Produtor não encontrado');
    }
    return produtor;
  }

  /**
   * Atualiza parcialmente os dados de um produtor existente.
   */
  async update(id: string, data: Partial<CreateProdutorDto>): Promise<Produtor> {
    return this.produtorRepository.update(id, data);
  }

    /**
   * Remove um produtor pelo ID.
   *
   * @param id UUID do produtor a ser removido
   * @throws NotFoundException se não existir
   */
  async delete(id: string): Promise<void> {
    return this.produtorRepository.deleteById(id);
  }

}
