import { Injectable, NotFoundException } from "@nestjs/common";
import { SafraRepository } from "./safra.repository";
import { Safra } from "../entities/safra.entity";
import { PrismaService } from "@/modules/prisma/prisma.service";
import { CreateSafraDto } from "../dto/create-safra.dto";

/**
 * Implementação da interface `SafraRepository` utilizando Prisma como mecanismo de persistência.
 *
 * Este repositório lida com a criação, atualização, remoção e recuperação de safras
 * armazenadas no banco de dados PostgreSQL via Prisma ORM.
 */
@Injectable()
export class PrismaSafraRepository implements SafraRepository {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * Cria uma nova safra no banco de dados.
   *
   * @param data Dados necessários para criar a safra
   * @returns Objeto `Safra` com os dados persistidos, incluindo timestamps
   */
  async create(data: CreateSafraDto): Promise<Safra> {
    const created = await this.prisma.safra.create({
      data: {
        nome: data.nome,
        ano: new Date(data.inicio).getFullYear(),
        inicio: new Date(data.inicio),
        fim: new Date(data.fim),
      },

      select: {
        id: true,
        nome: true,
        ano: true,
        inicio: true,
        fim: true,
        criadoEm: true,
        atualizadoEm: true,
      },
    });

    return created;
  }

  /**
   * Retorna todas as safras cadastradas no banco.
   *
   * @returns Lista de objetos `Safra`
   */
  async findAll(): Promise<Safra[]> {
    return this.prisma.safra.findMany();
  }

  /**
   * Busca uma safra pelo seu ID único.
   *
   * @param id Identificador da safra
   * @returns A safra correspondente ou `undefined` caso não encontrada
   */
  async findById(id: string): Promise<Safra | undefined> {
    return (await this.prisma.safra.findUnique({ where: { id } })) ?? undefined;
  }

  /**
   * Atualiza os dados de uma safra existente.
   *
   * @param id ID da safra a ser atualizada
   * @param data Campos a serem modificados
   * @returns Objeto `Safra` atualizado
   * @throws NotFoundException se a safra não for encontrada
   */
  async update(id: string, data: Partial<CreateSafraDto>): Promise<Safra> {
    try {
      const updated = await this.prisma.safra.update({
        where: { id },
        data: {
          ...data,
          ano: data.inicio ? new Date(data.inicio).getFullYear() : undefined,
        },
        select: {
          id: true,
          nome: true,
          ano: true,
          inicio: true,
          fim: true,
          criadoEm: true,
          atualizadoEm: true,
        },
      });

      return updated;
    } catch (e: any) {
      if (e.code === "P2025") {
        throw new NotFoundException("Safra não encontrada");
      }
      throw e;
    }
  }
}
