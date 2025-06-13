import { Injectable, NotFoundException } from "@nestjs/common";
import { FazendaRepository } from "./fazenda.repository";
import { Fazenda } from "../entities/fazenda.entity";
import { PrismaService } from "@/modules/prisma/prisma.service";
import { Prisma } from "@prisma/client";

/**
 * Implementação da interface `FazendaRepository` utilizando Prisma como mecanismo de persistência.
 *
 * Este repositório lida com a criação, atualização, remoção e recuperação de fazendas
 * armazenadas no banco de dados PostgreSQL via Prisma ORM.
 */
@Injectable()
export class PrismaFazendaRepository implements FazendaRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(fazenda: Fazenda): Promise<void> {
    const data: Prisma.FazendaUncheckedCreateInput = {
      id: fazenda.id,
      nome: fazenda.nome!,
      cidade: fazenda.cidade!,
      estado: fazenda.estado!,
      areaTotal: fazenda.areaTotal!,
      areaAgricultavel: fazenda.areaAgricultavel!,
      areaVegetacao: fazenda.areaVegetacao!,
      produtorId: fazenda.produtorId!,
    };

    await this.prisma.fazenda.create({ data });
  }

  async update(id: string, data: Partial<Fazenda>): Promise<void> {
    try {
      await this.prisma.fazenda.update({
        where: { id },
        data,
      });
    } catch (e: any) {
      if (e.code === "P2025") {
        throw new NotFoundException("Fazenda não encontrada");
      }
      throw e;
    }
  }

  async delete(id: string): Promise<void> {
    try {
      await this.prisma.fazenda.delete({
        where: { id },
      });
    } catch (e: any) {
      if (e.code === "P2025") {
        throw new NotFoundException("Fazenda não encontrada");
      }
      throw e;
    }
  }

  async findAll(): Promise<Fazenda[]> {
    return this.prisma.fazenda.findMany();
  }

  async findById(id: string): Promise<Fazenda | undefined> {
    return (
      (await this.prisma.fazenda.findUnique({
        where: { id },
      })) ?? undefined
    );
  }
}
