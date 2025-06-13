import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  NotFoundException,
} from "@nestjs/common";
import { CommandBus, QueryBus } from "@nestjs/cqrs";
import { CreateFazendaDto } from "../dto";
import { Fazenda } from "../entities/fazenda.entity";
import { CreateFazendaCommand } from "../commands/create-fazenda.command";
import { UpdateFazendaCommand } from "../commands/update-fazenda.command";
import { FindAllFazendasQuery } from "../queries/find-all-fazenda.query";
import { FindFazendaByIdQuery } from "../queries/find-fazenda-by-id.query";
import { DeleteFazendaCommand } from "../commands/delete-fazenda.command";

/**
 * Controlador responsável por lidar com as requisições relacionadas às fazendas.
 *
 * Todas as rotas deste controlador serão prefixadas por `/fazendas`.
 */
@Controller("fazendas")
export class FazendaController {
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
   * Rota para criar uma nova fazenda.
   *
   * @param dto Dados da fazenda a ser criada
   */
  @Post()
  async create(@Body() dto: CreateFazendaDto): Promise<Fazenda> {
    return this.commandBus.execute(new CreateFazendaCommand(dto));
  }

  /**
   * Rota para buscar todas as fazendas cadastradas.
   */
  @Get()
  async findAll(): Promise<Fazenda[]> {
    return this.queryBus.execute(new FindAllFazendasQuery());
  }

  /**
   * Rota para buscar uma fazenda pelo ID.
   *
   * @param id UUID da fazenda
   */
  @Get(":id")
  async findById(@Param("id") id: string): Promise<Fazenda> {
    const fazenda = await this.queryBus.execute(new FindFazendaByIdQuery(id));
    if (!fazenda) {
      throw new NotFoundException(`Fazenda com ID ${id} não encontrada`);
    }
    return fazenda;
  }

  /**
   * Rota para atualizar parcialmente uma fazenda existente.
   *
   * @param id UUID da fazenda a ser atualizada
   * @param dto Campos parciais a serem atualizados (nome, áreas, etc)
   */
  @Put(":id")
  async update(
    @Param("id") id: string,
    @Body() dto: Partial<CreateFazendaDto>,
  ): Promise<void> {
    return this.commandBus.execute(new UpdateFazendaCommand(id, dto));
  }
  /**
   * Rota para remover uma fazenda existente pelo ID.
   *
   * @param id UUID da fazenda a ser removida
   * @returns void
   */
  @Delete(":id")
  async delete(@Param("id") id: string): Promise<void> {
    return this.commandBus.execute(new DeleteFazendaCommand(id));
  }
}
