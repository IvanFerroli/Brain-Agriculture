import { Injectable, NotFoundException } from "@nestjs/common";
import { CulturaRepository } from "./cultura.repository";
import { Cultura } from "../entities/cultura.entity";
import { PrismaService } from "@/modules/prisma/prisma.service";
import { CreateCulturaDto } from "../dto/create-cultura.dto";

/**
 * Implementação da interface `CulturaRepository` utilizando Prisma como mecanismo de persistência.
 *
 * Este repositório lida com a criação, atualização, remoção e recuperação de culturas
 * armazenadas no banco de dados PostgreSQL via Prisma ORM.
 */
@Injectable()
export class PrismaCulturaRepository implements CulturaRepository {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * Cria uma nova cultura no banco de dados.
   *
   * @param data Dados necessários para criar a cultura (nome, safraId, fazendaId).
   * @returns Objeto `Cultura` com os dados persistidos, incluindo timestamps.
   */
  async create(data: CreateCulturaDto): Promise<Cultura> {
    const created = await this.prisma.cultura.create({
      data: {
        nome: data.nome,
        safraId: data.safraId,
        fazendaId: data.fazendaId,
      },
      select: {
        id: true,
        nome: true,
        safraId: true,
        fazendaId: true,
      },
    });

    return created;
  }

  /**
   * Retorna todas as culturas registradas no banco.
   *
   * @returns Lista de objetos `Cultura`
   */
  async findAll(): Promise<Cultura[]> {
    return this.prisma.cultura.findMany();
  }

  /**
   * Busca uma cultura pelo seu ID único.
   *
   * @param id Identificador da cultura
   * @returns A cultura correspondente ou `undefined` caso não encontrada
   */
  async findById(id: string): Promise<Cultura | undefined> {
    return (
      (await this.prisma.cultura.findUnique({ where: { id } })) ?? undefined
    );
  }

  /**
   * Atualiza os dados de uma cultura existente.
   *
   * @param id ID da cultura a ser atualizada
   * @param data Campos a serem modificados
   * @returns Objeto `Cultura` atualizado
   * @throws NotFoundException se a cultura não for encontrada
   */
  async update(id: string, data: Partial<CreateCulturaDto>): Promise<Cultura> {
    try {
      const updated = await this.prisma.cultura.update({
        where: { id },
        data,
        select: {
          id: true,
          nome: true,
          safraId: true,
          fazendaId: true,
        },
      });

      return updated;
    } catch (e: any) {
      if (e.code === "P2025") {
        throw new NotFoundException("Cultura não encontrada");
      }
      throw e;
    }
  }

  /**
   * Agrupa as culturas por nome e retorna a quantidade de ocorrências de cada uma.
   *
   * @returns Objeto com nome da cultura como chave e contagem como valor
   */
  async groupByCultura(): Promise<Record<string, number>> {
    const grouped = await this.prisma.cultura.groupBy({
      by: ["nome"],
      _count: { nome: true },
    });

    return grouped.reduce(
      (acc, item) => {
        acc[item.nome] = item._count.nome;
        return acc;
      },
      {} as Record<string, number>,
    );
  }

  
}
