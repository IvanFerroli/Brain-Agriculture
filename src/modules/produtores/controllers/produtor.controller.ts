import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateProdutorDto } from '../dto/create-produtor.dto';
import { Produtor } from '../entities/produtor.entity';
import { CreateProdutorCommand } from '../commands/create-produtor.command';
import { UpdateProdutorCommand } from '../commands/update-produtor.command';
import { FindAllProdutoresQuery } from '../queries/find-all-produtores.query';
import { FindProdutorByIdQuery } from '../queries/find-produtor-by-id.query';
import { DeleteProdutorCommand } from '../commands/delete-produtor.command'

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

  /**
   * Rota para atualizar parcialmente um produtor existente.
   *
   * @param id UUID do produtor a ser atualizado
   * @param dto Campos parciais a serem atualizados (nome, documento)
   * @returns O produtor atualizado
   */
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() dto: Partial<CreateProdutorDto>,
  ): Promise<Produtor> {
    return this.commandBus.execute(new UpdateProdutorCommand(id, dto));
  }

    /**
   * Rota para remover um produtor existente pelo ID.
   *
   * @param id UUID do produtor a ser removido
   * @returns void
   */
  @Delete(':id')
  async delete(@Param('id') id: string): Promise<void> {
    return this.commandBus.execute(new DeleteProdutorCommand(id));
  }

}
