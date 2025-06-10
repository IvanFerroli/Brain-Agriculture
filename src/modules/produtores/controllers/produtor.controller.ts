import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateProdutorDto } from '../dto/create-produtor.dto';
import { ProdutorService } from '../services/produtor.service';
import { Produtor } from '../entities/produtor.entity';

@Controller('produtores')
export class ProdutorController {
  constructor(private readonly produtorService: ProdutorService) {}

  @Post()
  async create(@Body() dto: CreateProdutorDto): Promise<Produtor> {
    return this.produtorService.create(dto);
  }

  @Get()
  async findAll(): Promise<Produtor[]> {
    return this.produtorService.findAll();
  }

  @Get(':id')
  async findById(@Param('id') id: string): Promise<Produtor> {
    return this.produtorService.findById(id);
  }
}
