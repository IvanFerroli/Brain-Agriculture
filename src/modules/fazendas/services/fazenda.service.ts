import { Injectable } from '@nestjs/common';
import { CreateFazendaDto } from '../dto/create-fazenda.dto';
import { Fazenda } from '../entities/fazenda.entity';
import { FazendaRepository } from '../repositories/fazenda.repository';

/**
 * Service responsável pelas regras de negócio das fazendas.
 *
 * Essa classe consome um repositório que implementa a interface `FazendaRepository`,
 * permitindo trocar facilmente a infraestrutura de persistência (in-memory, banco de dados etc.)
 * sem alterar a lógica de negócio.
 */

@Injectable()
export class FazendaService {
  constructor(
    private readonly fazendaRepository: FazendaRepository,
  ) {}

  async create(dto: CreateFazendaDto): Promise<void> {
    await this.fazendaRepository.create(dto);
  }

  async findAll(): Promise<Fazenda[]> {
    return await this.fazendaRepository.findAll();
  }

  async findById(id: string): Promise<Fazenda | undefined> {
    return await this.fazendaRepository.findById(id);
  }

  async update(id: string, data: Partial<CreateFazendaDto>): Promise<void> {
    await this.fazendaRepository.update(id, data);
  }

  async delete(id: string): Promise<void> {
    const fazendas = await this.fazendaRepository.findAll();
    const index = fazendas.findIndex((f) => f.id === id);

    if (index === -1) {
      throw new Error('Fazenda não encontrada');
    }

    fazendas.splice(index, 1);
  }
}
