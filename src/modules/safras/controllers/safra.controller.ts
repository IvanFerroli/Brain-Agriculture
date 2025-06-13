import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from "@nestjs/common";
import { CommandBus, QueryBus } from "@nestjs/cqrs";
import { CreateSafraDto } from "../dto/create-safra.dto";
import { Safra } from "../entities/safra.entity";
import { CreateSafraCommand } from "../commands/create-safra.command";
import { UpdateSafraCommand } from "../commands/update-safra.command";
import { FindAllSafraQuery } from "../queries/find-all-safra.query";
import { FindSafraByIdQuery } from "../queries/find-safra-by-id.query";
import { DeleteSafraCommand } from "../commands/delete-safra.command";

/**
 * Controlador responsável por lidar com as requisições relacionadas às safras.
 *
 * Todas as rotas deste controlador serão prefixadas por `/safras`.
 */
@Controller("safras")
export class SafraController {
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
   * Rota para criar uma nova safra.
   *
   * @param dto Dados da safra a ser criada
   * @returns A safra recém-criada
   */
  @Post()
  async create(@Body() dto: CreateSafraDto): Promise<Safra> {
    return this.commandBus.execute(new CreateSafraCommand(dto));
  }

  /**
   * Rota para buscar todas as safras cadastradas.
   *
   * @returns Lista de safras
   */
  @Get()
  async findAll(): Promise<Safra[]> {
    return this.queryBus.execute(new FindAllSafraQuery());
  }

  /**
   * Rota para buscar uma safra pelo ID.
   *
   * @param id UUID da safra
   * @returns Safra correspondente ou `undefined` se não encontrada
   */
  @Get(":id")
  async findById(@Param("id") id: string): Promise<Safra | undefined> {
    return this.queryBus.execute(new FindSafraByIdQuery(id));
  }

  /**
   * Rota para atualizar parcialmente uma safra existente.
   *
   * @param id UUID da safra a ser atualizada
   * @param dto Campos parciais a serem atualizados
   * @returns A safra atualizada
   */
  @Put(":id")
  async update(
    @Param("id") id: string,
    @Body() dto: Partial<CreateSafraDto>,
  ): Promise<Safra> {
    return this.commandBus.execute(new UpdateSafraCommand(id, dto));
  }
  /**
   * Rota para remover uma safra existente pelo ID.
   *
   * @param id UUID da safra a ser removida
   * @returns void
   */
  @Delete(":id")
  async delete(@Param("id") id: string): Promise<void> {
    return this.commandBus.execute(new DeleteSafraCommand(id));
  }
}
