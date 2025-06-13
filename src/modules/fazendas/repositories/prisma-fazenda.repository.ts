import { Injectable, NotFoundException } from "@nestjs/common";
import { FazendaRepository } from "./fazenda.repository";
import { Fazenda } from "../entities/fazenda.entity";
import { PrismaService } from "@/modules/prisma/prisma.service";
import { Prisma } from "@prisma/client";
import { DashboardFilterDto } from "@/modules/dashboard/dto/dashboard-filter.dto";

/**
 * Implementação da interface `FazendaRepository` utilizando Prisma como mecanismo de persistência.
 *
 * Este repositório lida com a criação, atualização, remoção e recuperação de fazendas
 * armazenadas no banco de dados PostgreSQL via Prisma ORM.
 */
@Injectable()
export class PrismaFazendaRepository implements FazendaRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(fazenda: Fazenda): Promise<Fazenda> {
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

    return await this.prisma.fazenda.create({ data });
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
  /**
   * Retorna a quantidade total de fazendas que obedecem aos filtros fornecidos.
   *
   * @param filters Objeto contendo filtros opcionais como estado, área mínima/máxima e termo de busca
   */
  async countByFilters(filters: DashboardFilterDto): Promise<number> {
    const { estado, areaMin, areaMax, search } = filters;

    const where: Prisma.FazendaWhereInput = {};

    if (estado) {
      where.estado = estado;
    }

    if (areaMin !== undefined || areaMax !== undefined) {
      where.areaTotal = {};
      if (areaMin !== undefined) where.areaTotal.gte = areaMin;
      if (areaMax !== undefined) where.areaTotal.lte = areaMax;
    }

    if (search) {
      const s = search.toLowerCase();
      where.OR = [
        { nome: { contains: s, mode: "insensitive" } },
        { cidade: { contains: s, mode: "insensitive" } },
        { estado: { contains: s, mode: "insensitive" } },
      ];
    }

    return this.prisma.fazenda.count({ where });
  }

  /**
   * Retorna a soma da área total das fazendas que obedecem aos filtros fornecidos.
   *
   * @param filters Objeto contendo filtros opcionais como estado, área mínima/máxima e termo de busca
   */
  async sumAreaTotalByFilters(filters: DashboardFilterDto): Promise<number> {
    const { estado, areaMin, areaMax, search } = filters;

    const where: Prisma.FazendaWhereInput = {};

    if (estado) {
      where.estado = estado;
    }

    if (areaMin !== undefined || areaMax !== undefined) {
      where.areaTotal = {};
      if (areaMin !== undefined) where.areaTotal.gte = areaMin;
      if (areaMax !== undefined) where.areaTotal.lte = areaMax;
    }

    if (search) {
      const s = search.toLowerCase();
      where.OR = [
        { nome: { contains: s, mode: "insensitive" } },
        { cidade: { contains: s, mode: "insensitive" } },
        { estado: { contains: s, mode: "insensitive" } },
      ];
    }

    const result = await this.prisma.fazenda.aggregate({
      _sum: {
        areaTotal: true,
      },
      where,
    });

    return result._sum.areaTotal ?? 0;
  }
  /**
   * Agrupa as fazendas por estado e retorna a contagem de registros em cada estado.
   *
   * @param filters Filtros opcionais como área ou termo de busca
   * @returns Objeto com estados como chave e quantidade de fazendas como valor
   */
  async groupByEstado(
    filters: DashboardFilterDto,
  ): Promise<Record<string, number>> {
    const { areaMin, areaMax, search } = filters;

    const where: Prisma.FazendaWhereInput = {};

    if (areaMin !== undefined || areaMax !== undefined) {
      where.areaTotal = {};
      if (areaMin !== undefined) where.areaTotal.gte = areaMin;
      if (areaMax !== undefined) where.areaTotal.lte = areaMax;
    }

    if (search) {
      const s = search.toLowerCase();
      where.OR = [
        { nome: { contains: s, mode: "insensitive" } },
        { cidade: { contains: s, mode: "insensitive" } },
        { estado: { contains: s, mode: "insensitive" } },
      ];
    }

    const grouped = await this.prisma.fazenda.groupBy({
      by: ["estado"],
      _count: { estado: true },
      where,
    });

    return grouped.reduce(
      (acc, item) => {
        acc[item.estado] = item._count.estado;
        return acc;
      },
      {} as Record<string, number>,
    );
  }

  /**
   * Retorna a soma total das áreas agricultáveis e de vegetação das fazendas filtradas.
   *
   * @param filters Filtros opcionais como estado, área mínima/máxima e termo de busca
   * @returns Objeto com totais das áreas agricultáveis e vegetação
   */
  async sumUsoDoSoloByFilters(
    filters: DashboardFilterDto,
  ): Promise<{ areaAgricultavel: number; areaVegetacao: number }> {
    const { estado, areaMin, areaMax, search } = filters;

    const where: Prisma.FazendaWhereInput = {};

    if (estado) {
      where.estado = estado;
    }

    if (areaMin !== undefined || areaMax !== undefined) {
      where.areaTotal = {};
      if (areaMin !== undefined) where.areaTotal.gte = areaMin;
      if (areaMax !== undefined) where.areaTotal.lte = areaMax;
    }

    if (search) {
      const s = search.toLowerCase();
      where.OR = [
        { nome: { contains: s, mode: "insensitive" } },
        { cidade: { contains: s, mode: "insensitive" } },
        { estado: { contains: s, mode: "insensitive" } },
      ];
    }

    const result = await this.prisma.fazenda.aggregate({
      _sum: {
        areaAgricultavel: true,
        areaVegetacao: true,
      },
      where,
    });

    return {
      areaAgricultavel: result._sum.areaAgricultavel ?? 0,
      areaVegetacao: result._sum.areaVegetacao ?? 0,
    };
  }
}
