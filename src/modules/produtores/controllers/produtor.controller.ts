import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateProdutorDto } from '../dto/create-produtor.dto';
import { Produtor } from '../entities/produtor.entity';
import { CreateProdutorCommand } from '../commands/create-produtor.command';
import { FindAllProdutoresQuery } from '../queries/find-all-produtores.query';
import { FindProdutorByIdQuery } from '../queries/find-produtor-by-id.query';

/**
 * Controlador responsável por lidar com as requisições relacionadas aos produtores.
 *
 * Todas as rotas deste controlador serão prefixadas por `/produtores`.
 */
@Controller('produtores')
export class ProdutorController {
  /**
   * Injeta os barramentos do CQRS (CommandBus e QueryBus).
   * 
   * @param commandBus Responsável por executar comandos (ações que alteram o estado)
   * @param queryBus Responsável por executar queries (ações que apenas leem dados)
   */
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  /**
   * Rota para criar um novo produtor.
   *
   * @param dto Dados do produtor a ser criado
   * @returns O produtor recém-criado
   */
  @Post()
  async create(@Body() dto: CreateProdutorDto): Promise<Produtor> {
    return this.commandBus.execute(new CreateProdutorCommand(dto));
  }

  /**
   * Rota para buscar todos os produtores cadastrados.
   *
   * @returns Lista de produtores
   */
  @Get()
  async findAll(): Promise<Produtor[]> {
    return this.queryBus.execute(new FindAllProdutoresQuery());
  }

  /**
   * Rota para buscar um produtor pelo ID.
   *
   * @param id UUID do produtor
   * @returns Produtor correspondente ou `undefined` se não encontrado
   */
  @Get(':id')
  async findById(@Param('id') id: string): Promise<Produtor | undefined> {
    return this.queryBus.execute(new FindProdutorByIdQuery(id));
  }
}
