import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { ProdutorRepository } from './produtor.repository';
import { CreateProdutorDto } from '../dto/create-produtor.dto';
import { Produtor } from '../entities/produtor.entity';
import { PrismaService } from '@/modules/prisma/prisma.service';

/**
 * Implementação do repositório de produtores usando Prisma e PostgreSQL.
 *
 * Este repositório realiza persistência real dos dados no banco configurado,
 * substituindo a versão in-memory sem alterar a interface pública.
 */
@Injectable()
export class PrismaProdutorRepository implements ProdutorRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateProdutorDto): Promise<Produtor> {
    try {
      return await this.prisma.produtor.create({
        data: {
          nome: data.nome,
          documento: data.documento,
        },
      });
    } catch (e: any) {
      if (e.code === 'P2002') {
        throw new ConflictException('Documento já cadastrado');
      }
      throw e;
    }
  }

  async findAll(): Promise<Produtor[]> {
    return this.prisma.produtor.findMany();
  }

  async findById(id: string): Promise<Produtor | undefined> {
    return (await this.prisma.produtor.findUnique({
      where: { id },
    })) ?? undefined;
  }

    async update(id: string, data: Partial<CreateProdutorDto>): Promise<Produtor> {
    try {
      return await this.prisma.produtor.update({
        where: { id },
        data: {
          ...data,
          atualizadoEm: new Date(),
        },
      });
    } catch (e: any) {
      if (e.code === 'P2025') {
        throw new NotFoundException('Produtor não encontrado');
      }
      throw e;
    }
  }

  /**
   * Remove um produtor pelo ID.
   *
   * @param id UUID do produtor a ser removido
   * @throws NotFoundException se não existir
   */
  async deleteById(id: string): Promise<void> {
    try {
      await this.prisma.produtor.delete({ where: { id } });
    } catch (e: any) {
      if (e.code === 'P2025') {
        throw new NotFoundException('Produtor não encontrado');
      }
      throw e;
    }
  }
}

