import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateCulturaDto } from '../dto/create-cultura.dto';
import { Cultura } from '../entities/cultura.entity';
import { CreateCulturaCommand } from '../commands/create-cultura.command';
import { UpdateCulturaCommand } from '../commands/update-cultura.command';
import { FindAllCulturaQuery } from '../queries/find-all-cultura.query';
import { FindCulturaByIdQuery } from '../queries/find-cultura-by-id.query';

/**
 * Controlador responsável por lidar com as requisições relacionadas às culturas.
 *
 * Todas as rotas deste controlador serão prefixadas por `/culturas`.
 */
@Controller('culturas')
export class CulturaController {
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
   * Rota para criar uma nova cultura.
   *
   * @param dto Dados da cultura a ser criada
   * @returns A cultura recém-criada
   */
  @Post()
  async create(@Body() dto: CreateCulturaDto): Promise<Cultura> {
    return this.commandBus.execute(new CreateCulturaCommand(dto));
  }

  /**
   * Rota para buscar todas as culturas cadastradas.
   *
   * @returns Lista de culturas
   */
  @Get()
  async findAll(): Promise<Cultura[]> {
    return this.queryBus.execute(new FindAllCulturaQuery());
  }

  /**
   * Rota para buscar uma cultura pelo ID.
   *
   * @param id UUID da cultura
   * @returns Cultura correspondente ou `undefined` se não encontrada
   */
  @Get(':id')
  async findById(@Param('id') id: string): Promise<Cultura | undefined> {
    return this.queryBus.execute(new FindCulturaByIdQuery(id));
  }

  /**
   * Rota para atualizar parcialmente uma cultura existente.
   *
   * @param id UUID da cultura a ser atualizada
   * @param dto Campos parciais a serem atualizados (nome, safraId, etc.)
   * @returns A cultura atualizada
   */
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() dto: Partial<CreateCulturaDto>,
  ): Promise<Cultura> {
    return this.commandBus.execute(new UpdateCulturaCommand(id, dto));
  }
}
