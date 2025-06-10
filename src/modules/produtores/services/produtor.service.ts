import { Injectable } from '@nestjs/common';
import { CreateProdutorDto } from '../dto/create-produtor.dto';
import { Produtor } from '../entities/produtor.entity';
import { v4 as uuid } from 'uuid';

/**
 * Service responsável por lidar com as regras de negócio relacionadas aos produtores.
 *
 * Neste estágio inicial, os dados estão sendo armazenados em memória (array local).
 * Em etapas futuras, será substituído por persistência real com banco de dados (ex: Prisma/PostgreSQL).
 */
@Injectable()
export class ProdutorService {
  /**
   * Lista que armazena temporariamente os produtores em memória.
   */
  private produtores: Produtor[] = [];

  /**
   * Cria um novo produtor e o adiciona à lista em memória.
   *
   * @param dto Objeto contendo o nome e documento do produtor a ser criado
   * @returns O produtor recém-criado, com ID e timestamps gerados automaticamente
   *
   * @example
   * this.create({ nome: "João", documento: "12345678900" })
   */
  create(dto: CreateProdutorDto): Produtor {
    const produtor: Produtor = {
      id: uuid(),
      nome: dto.nome,
      documento: dto.documento,
      criadoEm: new Date(),
      atualizadoEm: new Date(),
    };

    this.produtores.push(produtor);
    return produtor;
  }

  /**
   * Retorna todos os produtores cadastrados.
   *
   * @returns Lista de produtores atualmente armazenados em memória
   */
  findAll(): Produtor[] {
    return this.produtores;
  }

  /**
   * Busca um produtor específico com base no seu ID.
   *
   * @param id Identificador único (UUID) do produtor
   * @returns O produtor correspondente ao ID, ou `undefined` se não encontrado
   */
  findById(id: string): Produtor | undefined {
    return this.produtores.find(p => p.id === id);
  }
}
