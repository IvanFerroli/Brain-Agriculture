import { Injectable } from '@nestjs/common';
import { CreateProdutorDto } from '../dto/create-produtor.dto';
import { Produtor } from '../entities/produtor.entity';
import { v4 as uuid } from 'uuid';

@Injectable()
export class ProdutorService {
  private produtores: Produtor[] = [];

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

  findAll(): Produtor[] {
    return this.produtores;
  }

  findById(id: string): Produtor {
    return this.produtores.find(p => p.id === id);
  }
}
